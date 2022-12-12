import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rausers } from '../Models/Rausers';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:60656/api/users/del/';

  addUser(register: Rausers) {
    console.log(register);

    return this.http.post('http://localhost:60656/api/users/add', register);
  }
  deleteUser(id: number): Observable<number> {
    console.log(id);
    let httpheaders = new HttpHeaders().set('Content-type', 'application/Json');
    let options = {
      headers: httpheaders,
    };
    return this.http.delete<number>(this.url + id);
  }
}
