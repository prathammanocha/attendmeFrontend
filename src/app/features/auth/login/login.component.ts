import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: UntypedFormGroup;
    loading!: boolean;
    errormessage!: boolean;
    form!: UntypedFormGroup;
    usernameflag:boolean = false;
    passwordflag:boolean = false;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService, private http: HttpClient) {
    }

    

    ngOnInit() {
        
        this.titleService.setTitle('Attendme-Login');
        this.authenticationService.logout();
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new UntypedFormGroup({
            username: new UntypedFormControl('', Validators.required),
            password: new UntypedFormControl('', Validators.required),
            rememberMe: new UntypedFormControl(savedUserEmail !== null)
        });
    }

    login() {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;
        this.loading = true;
        this.errormessage = false;
        const data = {userName: username, password: password};
        const body = JSON.stringify(data);
        this.http.post<any>('https://localhost:5001/api/User/Authenticate', body,   
        {headers: new HttpHeaders({
          'content-type': 'application/json' }), observe: 'response'})
        .subscribe({
           next : (response) => {
            console.log(response.body.result);
            this.authenticationService.login(response.body.result, username);
            this.router.navigate(['/dashboard']);
          },
           error : (err) => {
            console.log(err);
            this.loading = false;
            this.errormessage = true;
           }
          });
        // this.http.get<any>("http://localhost:3000/logindetails")
        // .subscribe(
        //     (res) => {
        //         const user = res.find((a:any)=>{
        //         return a.username === username && a.password === password });
        //         if(user){
        //             this.router.navigate(['/dashboard']);
        //         } else {
        //             this.loading = false;
        //             this.errormessage = true;
        //             if(username === "") {
        //                 this.usernameflag = true;
        //             }
        //             if(password === ""){
        //                 this.passwordflag = true;
        //             }
        //         }
        // },
        // (error) => {
        //             this.loading = false;
        //             this.errormessage = true;
        //         }
        // );
    }
    
      
     
    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}