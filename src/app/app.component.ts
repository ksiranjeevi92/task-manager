import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token: string | null = this.authService.getToken();
    if (token) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
