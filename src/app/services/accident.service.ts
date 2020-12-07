import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseURL';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  constructor(private http:HttpClient) {  }

  getAccidents (): Observable<any> {
    const headers = new HttpHeaders(
      {
      'Content-Type': "text/plain",
    } );
    return this.http.get<any>(baseURL + `accidents`, {headers: headers});
             
  }
}
