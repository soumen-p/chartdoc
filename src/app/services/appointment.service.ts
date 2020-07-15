import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';


const getDoctorListUrl = 'api/ChartDoc/GetDoctorList/';
const getAppointmentUrl = 'api/ChartDoc/GetAppointment/';
const getReasonsUrl = 'api/ChartDoc/GetReason/';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

  public getDoctorList(strdate: string): Observable<any> {
    const baseUrl = getDoctorListUrl;
    const querystring = strdate;

    return this.http.get(environment.baseUrl + baseUrl + querystring);
  }
  public getAllReasons(): Observable<any> {
    return this.http.get(environment.baseUrl + getReasonsUrl + '-3');
  }

  public getAppointment(strdate: string): Observable<any> {
    const baseUrl = getAppointmentUrl;
    const querystring = strdate;

    return this.http.get(environment.baseUrl + baseUrl + querystring);
  }
  public setBookingInfo(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
  getBookingInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }
}
