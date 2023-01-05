import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-visitorlogdialog',
  templateUrl: './visitorlogdialog.component.html',
  styleUrls: ['./visitorlogdialog.component.css']
})
export class VisitorLogDialogComponent implements OnInit{

  name: string = "";
  companyname: string = "";
  constructor(private api: ApiService) { 
    const data = this.api.getDataStream();
    data.subscribe({
      next: (data: string) => {
        this.name = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    })

    const company = this.api.getCompanyName();
    company.subscribe({
      next: (company: string) => {
        this.companyname = company;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getAllTeacher();
  }

  getAllTeacher() {
    this.api.getTeacher()
    .subscribe({
      next:(res)=>{
        
      },
    })
}

}