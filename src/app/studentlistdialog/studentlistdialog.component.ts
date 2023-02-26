import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StudentlistdetailsComponent } from '../studentdetailsdialog /studentlistdetails.component';

@Component({
  selector: 'app-teacherdialog',
  templateUrl: './studentlistdialog.component.html',
  styleUrls: ['./studentlistdialog.component.css']
})
export class StudentlistdialogComponent implements OnInit {

  teacherForm!: FormGroup;
  actionBtn : string = "OK";
  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<StudentlistdialogComponent>, private dialog: MatDialog) { }

    displayedColumns: string[] = ['FirstName','LastName', 'HomeGroup', 'Relation', 'Type', 'AuthorizedPickup', 'Actions'];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngOnInit(): void {
      this.getAllTeacher();
    }
  
    openDialog() {
      this.dialog.open(StudentlistdetailsComponent, {
        width:'40%'
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
      this.dialog.open(StudentlistdialogComponent, {
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
