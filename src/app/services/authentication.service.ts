import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const BASE_URL = "api/chartdoc/getloginstatus";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  otpData;

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

  public getLoginCredentials(userName: string, password: string):Observable<any>{    
    return this.http.get(environment.baseUrl + BASE_URL + `/${userName}/${password}`);
  }

  public getLocalStorage(doctorInfo: string){
    return this.sharedService.getLocalItem(doctorInfo);
  }

  public setDoctorInformation(key: string, val: any){
    this.sharedService.setLocalItem(key, val);
  }

  public getDuoSignatureRequest(){

    // otpData can be saved in shared service : TODO
    this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
        this.otpData = data.total;
        console.log("otpData ", data.total) // testing
    })
    
    //return this.http.get(`http://182.18.157.229:8080/api/ChartDoc/GetDUOSignatureRequest?userName=suvresh.chatterjee@gmail.com`);
  }

  public nextCall(){
    return "suvresh.chatterjee@gmail.com"
  }
}
