import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllFarmersList(): Observable<any> {
  const url = `${environment.apiUrl}/farmer/getAllFarmersList`;
  return this.http.get(url);
}

getFarmerHistory(id:any): Observable<any> {
  const url = `${environment.apiUrl}/farmer/farmer-history?id=${id}`;
  return this.http.get(url);
}
}
