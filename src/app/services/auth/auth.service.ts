import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

type UserLogin = Omit<User, 'id'>;

export type TokenResponse = { token: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  isUserAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private readonly apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public userLogin(userDetails: UserLogin): Observable<TokenResponse> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<TokenResponse>(url, userDetails);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isUserAuthenticated$.next(true);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.isUserAuthenticated$.next(false);
  }
}
