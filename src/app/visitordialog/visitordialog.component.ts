import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../core/services/auth.service';
import { RelativeList } from '../core/models/relativetypes';
import { myCustomConstant } from '../config/constants';

@Component({
  selector: 'app-visitordialog',
  templateUrl: './visitordialog.component.html',
  styleUrls: ['./visitordialog.component.css']
})

export class VisitordialogComponent implements OnInit {

  visitorForm!: FormGroup;
  actionBtn : string = "OK";
  relatives!: RelativeList[];
  companyname: string = "";
  currentUser: any;

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<VisitordialogComponent>, private http: HttpClient, private authService: AuthenticationService) { }
  
  ngOnInit(): void {
   
    this.currentUser = this.authService.getCurrentUser();
    this.getAllTypes();

    this.visitorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactPhone: ['', Validators.required],
      patronTypeId: ['', Validators.required],
      contactEmail:['', Validators.required],
      companyName: ['', Validators.required],
      termsAndConditionCheck: ['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "OKwe";
      this.visitorForm.controls['firstName'].setValue(this.editData.firstName);
      this.visitorForm.controls['lastName'].setValue(this.editData.lastName);
      this.visitorForm.controls['companyName'].setValue(this.editData.companyName);
      this.visitorForm.controls['contactPhone'].setValue(this.editData.contactPhone);
      this.visitorForm.controls['patronTypeId'].setValue(this.editData.patronTypeId);
      this.visitorForm.controls['contactEmail'].setValue(this.editData.contactEmail);
      this.visitorForm.controls['termsAndConditionCheck'].setValue(this.editData.termsAndConditionCheck);
    } 
  }

  addvisitor(){
    this.visitorForm.markAllAsTouched();
    if(!this.editData){
      if(this.visitorForm.valid){
        const data = {
          "id": 0,
          "firstName": this.visitorForm.value.firstName,
          "lastName": this.visitorForm.value.lastName,
          "contactPhone": this.visitorForm.value.contactPhone,
          "contactEmail": this.visitorForm.value.contactEmail,
          "companyName": this.visitorForm.value.companyName,
          "termsAndConditionCheck": this.visitorForm.value.termsAndConditionCheck,
          "patronTypeId": Number(this.visitorForm.value.patronTypeId),
          "organisationId": Number(this.currentUser.organisationID)
        };
        console.log(data);
        this.http.post<any>( myCustomConstant.API_ENDPOINT + '/api/Visitor/Save', data,   
        {headers: new HttpHeaders({
          'content-type': 'application/json' }), observe: 'response'})
        .subscribe({
          next:(res)=>{
            console.log(res);
            alert("Visitor added successfully");
            this.visitorForm.reset();
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
    this.updatevisitor()
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


updatevisitor(){
  const data = {
    "guid": this.editData.guid,
    "id": this.editData.id,
    "firstName": this.visitorForm.value.firstName,
    "lastName": this.visitorForm.value.lastName,
    "contactPhone": this.visitorForm.value.contactPhone,
    "contactEmail": this.visitorForm.value.contactEmail,
    "companyName": this.visitorForm.value.companyName,
    "termsAndConditionCheck": this.visitorForm.value.termsAndConditionCheck,
    "referenceKeyId": this.editData.referenceKeyId,
    "patronTypeId": Number(this.visitorForm.value.patronTypeId),
    "organisationId": this.editData.organisationId
  };
  console.log(data);
  this.http.post<any>(myCustomConstant.API_ENDPOINT + '/api/Visitor/Save', data,   
  {headers: new HttpHeaders({
    'content-type': 'application/json' }), observe: 'response'})
  .subscribe({
    next:(res)=>{
      alert("Visitor Updated Succesfully");
      this.visitorForm.reset();
      this.dialogRef.close("update");
    },
    error:(err)=>{
      alert('Error while Updating')
    }
  })
}
}
