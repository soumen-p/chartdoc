import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const LOGIN_API = "api/chartdoc/getloginstatus";
const RESET_PASSWORD = "api/chartdoc/resetPassword";

const BASE_URL = "api/chartdoc/getloginstatus";
const MENU = "api/chartdoc/GetMenudata";
const GetUserAccessDetails = "api/chartdoc/GetUserAccessDetails?userTypeId=";
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
  
  public validateEmail(email: string){ 
    return interval(3000)
  }
  
  public validateCode(finalCode: string){
	
		return interval(3000)
	
  }
  
  public sendCode(){ 
    return interval(3000)
  }

  
  public getmenu():Observable<any>{    
    return this.http.get(environment.baseUrl + MENU );
  }
  public getUserAccessDetails(usertypeid:any):Observable<any>{    
    return this.http.get(environment.baseUrl + GetUserAccessDetails+ usertypeid);
  }
}
