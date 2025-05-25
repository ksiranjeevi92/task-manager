import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

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
    private router: Router
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
      password: new FormControl('Password@12345', [Validators.required]),
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
      this.authService.userLogin(userloginData).subscribe((res: User[]) => {
        if (res.length === 0) {
          this.info.nativeElement.innerText = 'Invalid credentials';
          timer(1000).subscribe(() => {
            this.info.nativeElement.innerText = '';
          });
        } else {
          this.authService.isUserAuthenticated$.next(true);
          this.router.navigate(['home']);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
