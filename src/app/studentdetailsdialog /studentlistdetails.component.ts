import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-studentdetailsdialog',
  templateUrl: './studentlistdetails.component.html',
  styleUrls: ['./studentlistdetails.component.css']
})
export class StudentlistdetailsComponent implements OnInit {

  teacherForm!: FormGroup;
  actionBtn : string = "OK";
  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<StudentlistdetailsComponent>, private dialog: MatDialog) { }

    displayedColumns: string[] = ['FirstName','LastName', 'Phone', 'Relation', 'Type'];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngOnInit(): void {
      this.getAllTeacher();
    }
  
    getAllTeacher(){
        this.api.getTeacher()
        .subscribe({
          next:(res)=>{
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          // error:()=>{
          //   alert("Sorry, Some Error Occured while adding the Teacher");
          // }
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
