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
import { StudentLog } from 'src/app/core/models/studentslog';
import { HttpClient } from '@angular/common/http';
import { RelativeList } from 'src/app/core/models/relativetypes';


@Component({
  selector: 'app-student-log',
  templateUrl: './student-log.component.html',
  styleUrls: ['./student-log.component.css']
})
export class StudentLogComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'homegroup', 'logType', 'otherReason', 'parentfirstName', 'parentlastName', 'patronId', 'logDateTime', 'Actions'];
  dataSource!: MatTableDataSource<any>;
  currentUser: any;
  token!: string;
  relatives!: RelativeList[];

  visitors!: StudentLog[];

  range = new FormGroup({
    fromDateTime: new FormControl<Date | null>(null),
    toDateTime: new FormControl<Date | null>(null),
  });

  constructor(private dialog: MatDialog, private api: ApiService, private authService: AuthenticationService, private http: HttpClient) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getAllTypes();
    this.dataSource = new MatTableDataSource<VisitorLog>();
  }

  openDialog(data:string, data2:string) {
    this.dialog.open(VisitorLogDialogComponent, {
      width:'40%'
    })
  }

  getAllTypes() {
    this.authService.getTypes(this.currentUser.token).subscribe({
      next:(res: any)=>{
      this.relatives = res.body.result;

    },
    error:()=>{
      alert("Sorry, Some Error Occured while adding the Visitor");
    }
  })
  }

  getRelativeName(id: number): string | undefined{
    for(let relative of this.relatives){
      if(id == relative.id){
        return relative.name;
      }
    }
    return;
  }

  
  getAllVisitors() {
    const fromDateTime = this.range.get('fromDateTime')?.value ?? null;
    const toDateTime = this.range.get('toDateTime')?.value ?? null ;
    if (fromDateTime && toDateTime) {
      this.token = this.currentUser.token;
      this.authService.getAllStudentsLog(this.token, fromDateTime, toDateTime)
        .subscribe({
          next: (res: any) => {
            console.log(res.body);
            this.visitors = res.body.result;
            this.visitors.forEach(visitor => {
              this.http.get(`https://localhost:5001/api/Student/GetById?studentId=${visitor.studentId}`, {
                headers: {
                  'Authorization': `Bearer ${this.token}`
                }
              }).subscribe((response: any) => {
                console.log(response);
                visitor.firstName = response.firstName;
                visitor.lastName = response.lastName;
                visitor.homegroup = response.grade;
              });

            this.http.get(`https://localhost:5001/api/Visitor/GetById?visitorId=${visitor.patronId}`, {
                headers: {
                  'Authorization': `Bearer ${this.token}`
                }
              }).subscribe((response: any) => {
                console.log(response);
                visitor.parentfirstName = response.result.firstName;
                visitor.parentlastName = response.result.lastName;
                visitor.patronId = response.result.patronTypeId;
              });
            });

            
            this.dataSource.data = this.visitors;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: () => {
            alert("Sorry, Some Error Occured while adding the Visitor");
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
