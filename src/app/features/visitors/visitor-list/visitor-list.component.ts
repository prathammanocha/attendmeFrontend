import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TeacherdialogComponent } from 'src/app/teacherdialog/teacherdialog.component';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { VisitorList } from 'src/app/core/models/visitors';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RelativeList } from '../../../core/models/relativetypes';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'companyName', 'contactPhone', 'contactEmail','patronTypeId', 'Actions'];
  visitors!: VisitorList[];
  
  dataSource = new MatTableDataSource<VisitorList>
  currentUser: any;
  token!: string;
  relatives!: RelativeList[];

  constructor(private dialog: MatDialog, private api: ApiService, private authService: AuthenticationService, private http:HttpClient) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getAllTeacher();
    this.getAllTypes();
  }

  openDialog() {
    this.dialog.open(TeacherdialogComponent, {
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val=='Saved'){
        this.getAllTeacher();
      }
    })
  }

  getAllTypes() {
    this.authService.getTypes(this.currentUser.token).subscribe({
      next:(res: any)=>{
      this.relatives = res.body.result;
      console.log(this.relatives);
    },
    error:()=>{
      alert("Sorry, Some Error Occured while adding the Visitor");
    }
  })
  }

  getAllTeacher(){
     this.token = this.currentUser.token;
     this.authService.getAllVisitors(this.token)
      .subscribe({
        next:(res: any)=>{
          console.log(res.body);
          this.visitors = res.body.result;
          this.dataSource = new MatTableDataSource<VisitorList>(this.visitors);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:()=>{
          alert("Sorry, Some Error Occured while adding the Visitor");
        }
      })
  }

  editTeacher(row : any){
    this.dialog.open(TeacherdialogComponent, {
      width:'30%',
      data:row
    }
    ).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllTeacher();
      }
    })
  }

  deleteTeacher(id: number){
    if(confirm("Are you sure you want to delete?")) {
      this.http.post<any>('https://localhost:5001/api/Visitor/Delete?visitorId='+id, '',   
      {headers: new HttpHeaders({
        'content-type': 'application/json' }), observe: 'response'})
      .subscribe({
      next:(response)=>{
        alert("Visitor deleted successfully")
        this.getAllTeacher();
      },
      error:()=>{
        alert("Error while Deleting")
      }
    })
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
