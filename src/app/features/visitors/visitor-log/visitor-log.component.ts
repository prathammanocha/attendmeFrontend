import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherdialogComponent } from 'src/app/teacherdialog/teacherdialog.component';
import { VisitorLogDialogComponent } from 'src/app/visitorlogdialog/visitorlogdialog.component';

@Component({
  selector: 'app-visitor-log',
  templateUrl: './visitor-log.component.html',
  styleUrls: ['./visitor-log.component.css']
})

export class VisitorLogComponent implements OnInit {

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
