import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const SEARCH_PATIENT = 'api/ChartDoc/SearchPatient';
const ADD_PATIENT = 'api/ChartDoc/AddPatient';
// const SAVE_APPOINTMENT = "api/ChartDoc/SaveAppointment";
const SAVE_APPOINTMENT = 'api/ChartDoc/SaveAppointmentNew';
const SERVICES = 'api/ChartDoc/GetServiceDetails';
const GETREASON = 'api/ChartDoc/GetReason';
const GETENOUNTER = 'api/ChartDoc/SearchPatientbyID/';
@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getSearchPatientResponse(firstName: string, lastName: string): Observable<any> {
    return this.http.get(environment.baseUrl + SEARCH_PATIENT + `/${firstName}/${lastName}`);
  }
  public addPatient(request: object): Observable<any> {
    return this.http.post(environment.baseUrl + ADD_PATIENT, {
      data: request
    });
  }
  public saveAppointment(request: FormData): Observable<any> {
    return this.http.post(environment.baseUrl + SAVE_APPOINTMENT, request,{responseType: 'text'});
  }
  public getAllServices(): Observable<any> {
    return this.http.get(environment.baseUrl + SERVICES);
  }
  public getReason(param: string): Observable<any> {
    return this.http.get(environment.baseUrl + GETREASON + '/' + param);
  }
  setCopayAppId(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
  getEncounterData(id: string): Observable<any> {
    return this.http.get(environment.baseUrl + GETENOUNTER + id)
  }
  
}
