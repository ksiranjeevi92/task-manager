import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  TokenResponse,
} from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loginInfo!: string;

  @ViewChild('info', { static: false }) info!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('example@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('password', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let userloginData = { ...this.loginForm.value };
      this.loadingService.show();
      this.authService.userLogin(userloginData).subscribe({
        next: (res: TokenResponse) => {
          this.authService.setToken(res.token);
          this.router.navigate(['home']);
          this.loadingService.hide();
        },
        error: (err) => {
          if (err.status === 401) {
            this.info.nativeElement.innerText = 'Invalid credentials';
            timer(1000).subscribe(() => {
              this.info.nativeElement.innerText = '';
            });
          } else {
            this.info.nativeElement.innerText =
              'Server error. Please try again.';
            timer(1000).subscribe(() => {
              this.info.nativeElement.innerText = '';
            });
          }
          this.loadingService.hide();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
