import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../core/services/auth.service';
import { RelativeList } from '../core/models/relativetypes';
import { myCustomConstant } from '../config/constants';


@Component({
  selector: 'app-studentdialog',
  templateUrl: './studentdialog.component.html',
  styleUrls: ['./studentdialog.component.css']
})

export class StudentdialogComponent implements OnInit {

  studentForm!: FormGroup;
  actionBtn : string = "OK";
  relatives!: RelativeList[];
  companyname: string = "";
  currentUser: any;

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<StudentdialogComponent>, private http: HttpClient, private authService: AuthenticationService) { }
  
  ngOnInit(): void {
   
    this.currentUser = this.authService.getCurrentUser();
    this.getAllTypes();

    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      grade: ['', Validators.required],
    });
    if(this.editData){
      this.actionBtn = "OK";
      this.studentForm.controls['firstName'].setValue(this.editData.firstName);
      this.studentForm.controls['lastName'].setValue(this.editData.lastName);
      this.studentForm.controls['grade'].setValue(this.editData.grade);
    } 
  }

  addstudent(){
    this.studentForm.markAllAsTouched();
    if(!this.editData){
      if(this.studentForm.valid){
        const data = {
          "firstName": this.studentForm.value.firstName,
          "lastName": this.studentForm.value.lastName,
          "grade": this.studentForm.value.grade,
        };
        console.log(data);
        this.http.post<any>( myCustomConstant.API_ENDPOINT + '/api/student/Save', data,   
        {headers: new HttpHeaders({
          'content-type': 'application/json' }), observe: 'response'})
        .subscribe({
          next:(res)=>{
            console.log(res);
            alert("student added successfully");
            this.studentForm.reset();
            this.dialogRef.close('Saved');
          },
          error:(err)=>{
            console.log(err);
            alert("Sorry, some error occured while adding the student");
          }
        })
      }
  }
  else{
    this.updatestudent()
  }
}

getAllTypes() {
  this.authService.getTypes(this.currentUser.token).subscribe({
    next:(res: any)=>{
    this.relatives = res.body.result;
    console.log(this.relatives);
  },
  error:()=>{
    alert("Sorry, Some Error Occured while adding the student");
  }
})
}


updatestudent(){
  const data = {
    "firstName": this.studentForm.value.firstName,
    "lastName": this.studentForm.value.lastName,
    "grade": this.studentForm.value.grade,
  };
  console.log(data);
  this.http.post<any>(myCustomConstant.API_ENDPOINT + '/api/student/Save', data,   
  {headers: new HttpHeaders({
    'content-type': 'application/json' }), observe: 'response'})
  .subscribe({
    next:(res)=>{
      alert("student Updated Succesfully");
      this.studentForm.reset();
      this.dialogRef.close("update");
    },
    error:(err)=>{
      alert('Error while Updating')
    }
  })
}
}
