import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ParentsdialogComponent } from 'src/app/parentsdialog/parentsdialog.component';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  displayedColumns: string[] = ['FirstName','LastName', 'Company', 'Phone', 'Email', 'Workingwc', 'ChildSafety', 'VDS', 'Actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllTeacher();
  }

  openDialog2() {
    this.dialog.open(ParentsdialogComponent, {
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val=='Saved'){
        this.getAllTeacher
      }
    })
  }

  getAllTeacher(){
      this.api.getParents()
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

  editTeacher(row : any){
    this.dialog.open(ParentsdialogComponent, {
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
    this.api.deleteParent(id)
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
