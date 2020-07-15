import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientICDModelEmployee } from '../models/PatientICD.model';
import { SharedService } from '../core/shared.service';

const getIcdUrl = 'api/ChartDoc/GetICD';
const getSavedIcdUrl = 'api/ChartDoc/GetSavedICD';
const localBaseUrl = 'api/ChartDoc/';

@Injectable({
  providedIn: 'root'
})
export class PatientIcdService {

  patinetemployees: PatientICDModelEmployee[];
  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }

  getPatientIcdDetails(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + getIcdUrl);
  }
  getSavedICD(patientId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + getSavedIcdUrl + `/${patientId}`);
  }
  public saveIcdDetails(icdDetailsData: PatientICDModelEmployee[]): Observable<any> {
    return this.httpClient.post(environment.baseUrl + localBaseUrl + 'SaveICD', icdDetailsData);
  }
  public getDynamicHtml(details: any) {
    return this.sharedService.getDynamicHtml(details);
  }
  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
  getBookingInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  getIcdDetails(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  setIcdDetails(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
}
