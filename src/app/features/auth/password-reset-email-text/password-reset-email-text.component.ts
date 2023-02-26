import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-password-reset-email-text',
  templateUrl: './password-reset-email-text.component.html',
  styleUrls: ['./password-reset-email-text.component.css']
})
export class PasswordResetEmailTextComponent implements OnInit {

  private email!: string;
  form!: UntypedFormGroup;
  loading!: boolean;
  

  constructor(private authService: AuthenticationService,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.titleService.setTitle('Password Reset Request');

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email])
    
    });

    this.form.get('email')?.valueChanges
      .subscribe((val: string) => { this.email = val.toLowerCase(); });
  }

  resetPassword() {
    this.router.navigate(['/auth/login']);
  }
}
