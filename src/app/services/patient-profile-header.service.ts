import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../core/shared.service';

// tslint:disable-next-line: variable-name
const localBaseUrl = 'api/ChartDoc';
// tslint:disable-next-line: variable-name
const epiclBASE_URL = 'api/ChartDoc';

@Injectable({
  providedIn: 'root'
})
export class PatientProfileHeaderService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private sharedService: SharedService) { }
  public GetPatientObservations(patientId: string, flag: string): Observable<any> {
    const endpoint = '/GetObservation/';
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');
    return this._http.get(environment.baseUrl + localBaseUrl + endpoint + `${patientId}`, { headers: myHeaders });
  }

  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
  getBookingInfo(bookinginfo: string) {
    return this.sharedService.getLocalItem(bookinginfo);
  }
  getDoctorDetails(doctorInfo: string) {
    return this.sharedService.getLocalItem(doctorInfo);
  }

  setBloodPressure(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  setPulse(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  setHeight(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  setWeight(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  setTemperature(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  setRespiratory(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  saveObservation(observationData: any): Observable<any> {
    const saveEndpoint = 'api/ChartDoc/SaveObservation';
    return this._http.post(environment.baseUrl + saveEndpoint, observationData, { responseType: 'text' });
  }
}
