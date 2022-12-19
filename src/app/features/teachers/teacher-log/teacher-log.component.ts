import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TeacherdialogComponent } from 'src/app/teacherdialog/teacherdialog.component';

@Component({
  selector: 'app-teacher-log',
  templateUrl: './teacher-log.component.html',
  styleUrls: ['./teacher-log.component.css']
})
export class TeacherLogComponent implements OnInit {

  displayedColumns: string[] = ['id','teacherName', 'teacherID', 'departmentName', 'gender','actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllTeacher();
  }

  openDialog() {
    this.dialog.open(TeacherdialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val=='Saved'){
        this.getAllTeacher
      }
    })
  }

  getAllTeacher(){
      this.api.getTeacher()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:()=>{
          alert("Sorry, Some Error Occured while adding the Teacher");
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
    this.api.deleteTeacher(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted successfully")
      },
      error:()=>{
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
