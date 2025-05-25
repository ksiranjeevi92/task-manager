import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  readonly isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  public show() {
    this.loadingSubject.next(true);
  }

  public hide() {
    this.loadingSubject.next(false);
  }

  public toggle(value: boolean) {
    this.loadingSubject.next(value);
  }
}
