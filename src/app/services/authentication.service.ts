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

}
