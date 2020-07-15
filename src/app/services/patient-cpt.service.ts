import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientCPTModel } from '../models/PatientCPT.model';
import { environment } from 'src/environments/environment';
import { SharedService } from '../core/shared.service';


const getCptUrl = 'api/ChartDoc/GetCPT';
const getSavedCptUrl = 'api/ChartDoc/GetSavedCPT';
const saveCptUrl = 'api/ChartDoc/SaveCPT';
const getCptWithChargeAmountUrl = 'api/ChartDoc/GetCPTWITHChargeAmount';


@Injectable({
  providedIn: 'root'
})
export class PatientCptService {

  patinetemployees: PatientCPTModel[];
  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }
  getPatientCptDetails(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + getCptUrl);
  }
  getSavedCPT(patientId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + getSavedCptUrl + `/${patientId}`);
  }
  saveCptDetails(cptDetailsData: PatientCPTModel[]): Observable<any> {
    return this.httpClient.post(environment.baseUrl + saveCptUrl, cptDetailsData, { responseType: 'text' });
  }
  getCptWithChargeAmountDetails(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + getCptWithChargeAmountUrl);
  }
  
  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
  getCptDetailsByPatientId(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  setCptDetailsByPatientId(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
  getAllCpt(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  getBookingInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  setAllCpt(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
}
