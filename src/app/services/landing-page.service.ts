import { Injectable } from '@angular/core';
import { SharedService } from '../core/shared.service';
import { DoctorInformation } from '../models/doctor-information';
import { Patient } from '../models/patient.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const userList = "api/ChartDoc/GetUserList";

@Injectable({
  providedIn: 'root'
})

export class LandingPageService {

  constructor(private http: HttpClient, private sharedService: SharedService)
    { }

  setDoctorInfo(key: string, val: any){
    this.sharedService.setLocalItem(key,val);
  }
  public getUserList(): Observable<any> {
    return this.http.get(environment.baseUrl + userList );
  }
}
