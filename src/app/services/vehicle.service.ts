import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles (): Observable<any> {
    const headers = new HttpHeaders(
      {
      'Content-Type': "text/plain",
    } );
    return this.http.get<any>(baseURL + `Vehicles`, {headers: headers});
             
  }

  DeleteVehicles(id: any): Observable<any> {
    const headers = new HttpHeaders({
      ContentType: "application/json"
    });
  
    return this.http.delete(baseURL + "Vehicles/" + id, { headers: headers });
  }

  addVehicle(user: any): Observable<any> {
    console.log(user);
    const headers = new HttpHeaders(
      {
      'Content-Type': 'application/json',
    } );
    
    return this.http.post<any>(baseURL + `Vehicles/add` , user, {headers: headers});

  }

  putVehicle(user: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      ContentType: "application/json",
    });
    delete user.id 
    console.log(user)
    return this.http.put(baseURL + 'Vehicles/'+id, user, {
      headers: headers
    });
  }

}
