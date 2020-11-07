import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';
const BASE_URL = "api/chartdoc/GetDUOSignatureRequest";

@Injectable({
  providedIn: 'root'
})
export class LoginDuoService {
    constructor(private http: HttpClient, private sharedService: SharedService)
    { }

  setDoctorInfo(key: string, val: any){
    this.sharedService.setLocalItem(key,val);
  }
  public getDuoSignatureRequest(strEmail: string): Observable<any> {
    const querystring = strEmail;
    return this.http.get(environment.baseUrl + BASE_URL + `?userName=${strEmail}`);
  }
}
