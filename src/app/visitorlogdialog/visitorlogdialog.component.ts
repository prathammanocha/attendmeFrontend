import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-visitorlogdialog',
  templateUrl: './visitorlogdialog.component.html',
  styleUrls: ['./visitorlogdialog.component.scss']
})
export class VisitorLogDialogComponent implements OnInit{

  constructor(private api: ApiService) { }

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