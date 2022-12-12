import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../Models/Blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:60656/api/post/';

  addBlog(blog: Blog) {
    console.log(blog);
    return this.http.post(this.url + 'add', blog);
  }

  editBlog(id: number, blog: Blog) {
    console.log(id);
    console.log(blog);
    console.log(this.url + 'edit/' + id, blog);
    return this.http.put(this.url + 'edit/' + id, blog);
  }

  getBlogList(): Observable<any> {
    return this.http.get<any[]>(this.url + 'list');
  }

  getBlogById(id: number): Observable<any> {
    console.log(id);
    return this.http.get<any[]>(this.url + 'get/' + id);
  }

  deleteBlog(id: number): Observable<number> {
    console.log(id);
    let httpheaders = new HttpHeaders().set('Content-type', 'application/Json');
    let options = {
      headers: httpheaders,
    };
    return this.http.delete<number>(this.url + 'del/' + id);
  }

  // deleteUser(id: number): Observable<number> {
  //   console.log(id);
  //   let httpheaders = new HttpHeaders().set('Content-type', 'application/Json');
  //   let options = {
  //     headers: httpheaders,
  //   };
  //   return this.http.delete<number>(this.url + id);
  // }
}
