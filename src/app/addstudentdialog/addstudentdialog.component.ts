import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addstudentdialog',
  templateUrl: './addstudentdialog.component.html',
  styleUrls: ['./addstudentdialog.component.css']
})
export class addstudentDialogComponent implements OnInit{

  teacherForm!: FormGroup;
  actionBtn : string = "OK";
  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<addstudentDialogComponent>) { }

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      teacherName: ['', Validators.required],
      teacherID: ['', Validators.required],
      departmentName: ['', Validators.required],
      gender:['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Update";
      this.teacherForm.controls['teacherName'].setValue(this.editData.teacherName);
      this.teacherForm.controls['teacherID'].setValue(this.editData.teacherID);
      this.teacherForm.controls['departmentName'].setValue(this.editData.departmentName);
      this.teacherForm.controls['gender'].setValue(this.editData.gender);
    }
  }
  addTeacher(){
    if(!this.editData){
      if(this.teacherForm.valid){
        this.api.postTeacher(this.teacherForm.value)
        .subscribe({
          next:(res)=>{
            alert("Teacher Added Successfully");
            this.teacherForm.reset();
            this.dialogRef.close('Saved');
          },
          error:()=>{
            alert("Sorry, Some Error Occured while adding the Teacher");
          }
        })
      }
  }
  else{
    this.updateTeacher()
  }
}
updateTeacher(){
  this.api.putTeacher(this.teacherForm.value, this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Teacher Updated Succesfully");
      this.teacherForm.reset();
      this.dialogRef.close("update");
    },
    error:(err)=>{
      alert('Error while Updating')
    }
  })
}

}