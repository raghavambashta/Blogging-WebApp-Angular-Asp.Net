import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  baseUrl: string = 'http://localhost:60656/api/login';
  constructor(private http: HttpClient) {}
  verifyUser(login: Login) {
    console.log(login);
    return this.http.post<Login>(
      this.baseUrl,
      JSON.stringify(login),
      this.httpOptions
    );
  }
}
