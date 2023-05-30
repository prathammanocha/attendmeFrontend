import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StudentlistdialogComponent } from 'src/app/studentlistdialog/studentlistdialog.component';
import { addstudentDialogComponent } from 'src/app/addstudentdialog/addstudentdialog.component';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StudentList } from 'src/app/core/models/studentlist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentdialogComponent } from 'src/app/studentdialog/studentdialog.component';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  displayedColumns: string[] = ['firstName','lastName', 'grade', 'Actions'];

  students!: StudentList[];
  
  dataSource = new MatTableDataSource<StudentList>
  currentUser: any;
  token!: string;

  constructor(private dialog: MatDialog, private api: ApiService, private http: HttpClient, private authService: AuthenticationService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getAllStudents();
  }

  openDialog() {
    this.dialog.open(StudentlistdialogComponent, {
      width:'70%'
    })
  }

  openDialog2() {
    this.dialog.open(addstudentDialogComponent, {
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val=='Saved'){
        this.getAllStudents();
      } 
    })
  }

  getAllStudents(){
    this.token = this.currentUser.token;
    this.authService.getAllStudents(this.token)
     .subscribe({
       next:(res: any)=>{
         console.log(res.body);
         this.students = res.body.result;
         this.dataSource = new MatTableDataSource<StudentList>(this.students);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       },
       error:()=>{
         alert("Sorry, Some Error Occured while getting the students");
       }
     })
  }

  editStudent(row : any){
    this.dialog.open(StudentdialogComponent, {
      width:'30%',
      data:row
    }
    ).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllStudents();
      }
    })
  }

  deleteStudent(id: number){
    this.api.deleteStudent(id)
    .subscribe({
      next:(res)=>{
        alert("Student deleted successfully")
        this.getAllStudents();
      },
      error:(err)=>{
        console.log(err);
        alert("Error while Deleting")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
