import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private auth: AuthService) {}

  logout() {
    this.auth.clearToken();
    this.router.navigateByUrl('auth/login');
  }
}
