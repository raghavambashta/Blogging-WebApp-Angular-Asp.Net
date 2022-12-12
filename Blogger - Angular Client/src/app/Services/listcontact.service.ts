import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListContactService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  url: string = 'http://localhost:60656/api/contact/';

  constructor(private httpclient: HttpClient) {}
  getContactList(): Observable<any> {
    return this.httpclient.get<any[]>(this.url + 'list');
  }
  deleteContact(id: number): Observable<number> {
    console.log(id);
    let httpheaders = new HttpHeaders().set('Content-type', 'application/Json');
    let options = {
      headers: httpheaders,
    };
    return this.httpclient.delete<number>(this.url + 'del/' + id);
  }
}
