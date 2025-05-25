import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}

  isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
