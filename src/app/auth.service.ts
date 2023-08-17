import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email,
      password,
    };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
  register(name: string, email: string, password: string): Observable<any> {
    const registerData = {
      name,
      email,
      password,
    };
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
