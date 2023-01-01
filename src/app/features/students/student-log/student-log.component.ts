import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VisitorLogDialogComponent } from 'src/app/visitorlogdialog/visitorlogdialog.component';

@Component({
  selector: 'app-student-log',
  templateUrl: './student-log.component.html',
  styleUrls: ['./student-log.component.css']
})

export class StudentLogComponent implements OnInit {

  displayedColumns: string[] = ['FirstName','LastName', 'CompanyName', 'Email', 'Phone', 'In Date-Time', 'Out Date-Time', 'Actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllTeacher();
  }

  openDialog() {
    this.dialog.open(VisitorLogDialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val=='Saved'){
        this.getAllTeacher
      }
    })
  }

  getAllTeacher() {
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
