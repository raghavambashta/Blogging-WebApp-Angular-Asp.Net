import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rausers } from '../Models/Rausers';

@Injectable({
  providedIn: 'root',
})
export class ListusersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  url: string = 'http://localhost:60656/api/users/listusers';

  constructor(private httpclient: HttpClient) {}
  getUserList(): Observable<any> {
    return this.httpclient.get<any[]>(this.url);
  }
}
