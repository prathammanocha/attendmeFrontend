import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VisitorLogDialogComponent } from 'src/app/visitorlogdialog/visitorlogdialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { VisitorLog } from 'src/app/core/models/visitorlog';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-visitor-log',
  templateUrl: './visitor-log.component.html',
  styleUrls: ['./visitor-log.component.css']
})
export class VisitorLogComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'visitingPerson', 'purpose', 'phone', 'inDateTime', 'outDateTime', 'Actions'];
  dataSource!: MatTableDataSource<any>;
  currentUser: any;
  token!: string;

  visitors!: VisitorLog[];

  range = new FormGroup({
    fromDateTime: new FormControl<Date | null>(null),
    toDateTime: new FormControl<Date | null>(null),
  });

  constructor(private dialog: MatDialog, private api: ApiService, private authService: AuthenticationService, private http: HttpClient) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.dataSource = new MatTableDataSource<VisitorLog>();
  }

  openDialog(data:string, data2:string) {
    this.dialog.open(VisitorLogDialogComponent, {
      width:'40%'
    })
  }

  
  getAllVisitors() {
    const fromDateTime = this.range.get('fromDateTime')?.value ?? null;
    const toDateTime = this.range.get('toDateTime')?.value ?? null ;
    if (fromDateTime && toDateTime) {
      this.token = this.currentUser.token;
      this.authService.getAllVisitorsLog(this.token, fromDateTime, toDateTime)
        .subscribe({
          next: (res: any) => {
            console.log(res.body);
            this.visitors = res.body.result;
  
            this.visitors.forEach(visitor => {
              this.http.get(`https://localhost:5001/api/Visitor/GetById?visitorId=${visitor.patronId}`, {
                headers: {
                  'Authorization': `Bearer ${this.token}`
                }
              }).subscribe((response: any) => {
                visitor.firstName = response.result.firstName;
                visitor.lastName = response.result.lastName;
                visitor.phone = response.result.contactPhone;
                this.api.putDataToStream(response.result.firstName);
                this.api.putCompanyName(response.result.companyName);
              });
            });
            
            console.log(this.visitors);
            this.dataSource.data = this.visitors;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: () => {
            alert("Sorry, Some Error Occurred while adding the Visitor");
          }
        });
    }
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
