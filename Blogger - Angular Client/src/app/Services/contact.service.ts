import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../Models/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  add(contact: Contact) {
    return this.http.post<Contact>(
      'http://localhost:60656/api/contact/add',
      JSON.stringify(contact),
      this.httpOptions
    );
  }
}
