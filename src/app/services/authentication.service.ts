import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const LOGIN_API = "api/chartdoc/getloginstatus";

const RESET_PASSWORD = "api/chartdoc/resetPassword";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

  public getLoginCredentials(userName: string, password: string):Observable<any>{    
    return this.http.get(environment.baseUrl + LOGIN_API + `/${userName}/${password}`);
  }

  public getLocalStorage(doctorInfo: string){
    return this.sharedService.getLocalItem(doctorInfo);
  }

  public setDoctorInformation(key: string, val: any){
    this.sharedService.setLocalItem(key, val);
  }

  public resetPassword(userName: string){  
    //this.http.get(environment.baseUrl + RESET_PASSWORD + `/${userName}`);
    return interval(3000)
  }

}
