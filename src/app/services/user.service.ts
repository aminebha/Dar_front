import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseURL';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers (): Observable<any> {
    const headers = new HttpHeaders(
      {
      'Content-Type': "text/plain",
    } );
    return this.http.get<any>(baseURL + `users`, {headers: headers});
             
  }

  DeleteUsers(id: any): Observable<any> {
    const headers = new HttpHeaders({
      ContentType: "application/json"
    });
  
    return this.http.delete(baseURL + "users/" + id, { headers: headers });
  }

  addUser(user: any): Observable<any> {
    console.log(user);
    const headers = new HttpHeaders(
      {
      'Content-Type': 'application/json',
    } );
    
    return this.http.post<any>(baseURL + `users/add` , user, {headers: headers});

  }

  putUsers(Products: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      ContentType: "application/json",
    });
  
    return this.http.post(baseURL + id, Products, {
      headers: headers
    });
  }

}
