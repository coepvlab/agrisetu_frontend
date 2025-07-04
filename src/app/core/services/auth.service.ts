import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Correct import
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://192.168.0.107:8080/auth';
 
  constructor(private http: HttpClient) { }  // HttpClient injection here

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('user');
  }

  login(data: { username: string; password: string }): Observable<any> {
  return this.http.post(`${environment.authUrl}/login`, data, {
    responseType: 'text' as 'json' // 👈 This is important
  });
}


  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // login(username: string, password: string): boolean {
  //   if (username === 'Nayan' && password === '123') {
  //     sessionStorage.setItem('user', JSON.stringify({ username }));
  //     return true;
  //   }
  //   return false;
  // }

  logout(): void {
    sessionStorage.removeItem('user');
  }

  register(data: any): Observable<any> {
    return this.http.post(`${environment.authUrl}/register`, data);  
  }
}
