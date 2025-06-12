import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FarmerService {

 
  private testUrl = 'http://192.168.0.107:8080/VirtualMathsLab/vml/handshake/api';
  
 
  constructor(private http: HttpClient) { }

  submitSelectedCrops(crops: any[], username: string): Observable<any> {
    const url = `${environment.apiUrl}/farmer/add-crops?username=${username}`;
    return this.http.post(url, crops);
  }

    updateSelectedCrops(crops: any[], username: string): Observable<any> { 
    const url = `${environment.apiUrl}/farmer/update-crops?username=${username}`;
    return this.http.post(url, crops);
  }

  getSelectedCropsByFarmer(username: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/farmer/get-crops?username=${username}`
    );
  }
  
  CallAPIToSendData(crops: any, username:string): Observable<any> {
    const url = `${environment.apiUrl}/farmer/add-crop-details?username=${username}`;
    return this.http.post(url, crops);
  }

  uploadImageToServer(formData: any, username:string): Observable<any> {
    const url = `${environment.apiUrl}/farmer/upload/image?username=${username}`;
    return this.http.post(url, formData);
  }

  testIntegration(): Observable<any> {
    return this.http.get<any>(
      `${this.testUrl}`
    );
  }


}
