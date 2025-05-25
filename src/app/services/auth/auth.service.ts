import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

type UserLogin = Omit<User, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private readonly apiUrl: string = environment.baseUrl + '/users';

  constructor(private http: HttpClient) {}

  public userLogin(userDetails: UserLogin): Observable<User[]> {
    const url = `${this.apiUrl}?email=${userDetails.email}`;
    return this.http.get<User[]>(url);
  }
}
