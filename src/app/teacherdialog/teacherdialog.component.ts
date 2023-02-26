import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../core/services/auth.service';
import { RelativeList } from '../core/models/relativetypes';

@Component({
  selector: 'app-teacherdialog',
  templateUrl: './teacherdialog.component.html',
  styleUrls: ['./teacherdialog.component.css']
})

export class TeacherdialogComponent implements OnInit {

  teacherForm!: FormGroup;
  actionBtn : string = "OK";
  relatives!: RelativeList[];
  companyname: string = "";
  currentUser: any;

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<TeacherdialogComponent>, private http: HttpClient, private authService: AuthenticationService) { }
  
  ngOnInit(): void {
   
    this.currentUser = this.authService.getCurrentUser();
    this.getAllTypes();

    this.teacherForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactPhone: ['', Validators.required],
      patronTypeId: ['', Validators.required],
      contactEmail:['', Validators.required],
      companyName: ['', Validators.required],
      termsAndConditionCheck: ['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Update";
      this.teacherForm.controls['firstName'].setValue(this.editData.firstName);
      this.teacherForm.controls['lastName'].setValue(this.editData.lastName);
      this.teacherForm.controls['companyName'].setValue(this.editData.companyName);
      this.teacherForm.controls['contactPhone'].setValue(this.editData.contactPhone);
      this.teacherForm.controls['patronTypeId'].setValue(this.editData.patronTypeId);
      this.teacherForm.controls['contactEmail'].setValue(this.editData.contactEmail);
      this.teacherForm.controls['termsAndConditionCheck'].setValue(this.editData.termsAndConditionCheck);
    } 
  }

  addTeacher(){
    this.teacherForm.markAllAsTouched();
    if(!this.editData){
      if(this.teacherForm.valid){
        const data = {
          "id": 0,
          "firstName": this.teacherForm.value.firstName,
          "lastName": this.teacherForm.value.lastName,
          "contactPhone": this.teacherForm.value.contactPhone,
          "contactEmail": this.teacherForm.value.contactEmail,
          "companyName": this.teacherForm.value.companyName,
          "termsAndConditionCheck": this.teacherForm.value.termsAndConditionCheck,
          "patronTypeId": Number(this.teacherForm.value.patronTypeId),
          "organisationId": Number(this.currentUser.organisationID)
        };
        console.log(data);
        this.http.post<any>('https://localhost:5001/api/Visitor/Save', data,   
        {headers: new HttpHeaders({
          'content-type': 'application/json' }), observe: 'response'})
        .subscribe({
          next:(res)=>{
            console.log(res);
            alert("Visitor added successfully");
            this.teacherForm.reset();
            this.dialogRef.close('Saved');
          },
          error:(err)=>{
            console.log(err);
            alert("Sorry, some error occured while adding the Visitor");
          }
        })
      }
  }
  else{
    this.updateTeacher()
  }
}

getAllTypes() {
  this.authService.getTypes(this.currentUser.token).subscribe({
    next:(res: any)=>{
    this.relatives = res.body.result;
    console.log(this.relatives);
  },
  error:()=>{
    alert("Sorry, Some Error Occured while adding the Visitor");
  }
})
}


updateTeacher(){
  const data = {
    "guid": this.editData.guid,
    "id": this.editData.id,
    "firstName": this.teacherForm.value.firstName,
    "lastName": this.teacherForm.value.lastName,
    "contactPhone": this.teacherForm.value.contactPhone,
    "contactEmail": this.teacherForm.value.contactEmail,
    "companyName": this.teacherForm.value.companyName,
    "termsAndConditionCheck": this.teacherForm.value.termsAndConditionCheck,
    "referenceKeyId": this.editData.referenceKeyId,
    "patronTypeId": Number(this.editData.patronTypeId),
    "organisationId": this.editData.organisationId
  };
  console.log(data);
  this.http.post<any>('https://localhost:5001/api/Visitor/Save', data,   
  {headers: new HttpHeaders({
    'content-type': 'application/json' }), observe: 'response'})
  .subscribe({
    next:(res)=>{
      alert("Visitor Updated Succesfully");
      this.teacherForm.reset();
      this.dialogRef.close("update");
    },
    error:(err)=>{
      alert('Error while Updating')
    }
  })
}
}
