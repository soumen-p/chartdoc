import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';
import { AnonymousSubject } from 'rxjs/internal/Subject';

const LOGIN_API = "api/chartdoc/UserLogin";
const VALIDATE_USER = "api/ChartDoc/ValidateUserEmail";
const CHANGE_PASSWORD = "api/ChartDoc/ChangePassword";


const BASE_URL = "api/chartdoc/getloginstatus";
const MENU = "api/chartdoc/GetMenudata";
const GetUserAccessDetails = "api/chartdoc/GetUserAccessDetails?userTypeId=";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

    // API reference 182.18.157.229:8085/swagger/index.html 

  public getLoginCredentials(userName: string, password: string):Observable<any>{    
    //return this.http.get(environment.baseUrl + LOGIN_API + `/${userName}/${password}`);

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({
      "UserName": userName,
      "Password": password
    });
    //console.log(body);
    return this.http.post(environment.baseUrl + LOGIN_API, body, {'headers':headers})
  }

  public getLocalStorage(doctorInfo: string){
    return this.sharedService.getLocalItem(doctorInfo);
  }

  public setDoctorInformation(key: string, val: any){
    this.sharedService.setLocalItem(key, val);
  }

  public resetPassword(user: string):Observable<any>{    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({
      "email": user
    });
    return this.http.post(environment.baseUrl + VALIDATE_USER, body, {'headers':headers})
  }

  public changePassword(user):Observable<any>{    
    let {email, password} = user;
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({
      email,
      password
    });
    return this.http.post(environment.baseUrl + CHANGE_PASSWORD, body, {'headers':headers})
  }
  
  public validateEmail(email: string){ 
    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({
      "email": email
    });
    return this.http.post(environment.baseUrl + VALIDATE_USER, body, {'headers':headers})
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
