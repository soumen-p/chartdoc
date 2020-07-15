import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const endpoint = 'api/ChartDoc/GetEncounter';
const saveEndpoint = 'api/ChartDoc/SaveEncounter';
@Injectable({
  providedIn: 'root'
})
export class PatientEncounterService {

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }
  public GetPatientEncounters(Patientid: string): Observable<any> {
    Patientid = btoa(Patientid);
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');

    return this.http.get(environment.baseUrl + endpoint + `/${Patientid}`, { headers: myHeaders });
  }

  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }

  getDoctorDetails(doctorInfo: string) {
    return this.sharedService.getLocalItem(doctorInfo);
  }
  getBookingInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  getEncounterNote(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  setEncounterNote(key: string, val: string) {
    this.sharedService.setLocalItem(key, val);
  }

  removeLocalEncounter(key: string) {
    this.sharedService.removeLocalStorage(key);
  }

  saveEncounter(encounterData: any): Observable<any> {
    return this.http.post(environment.baseUrl + saveEndpoint, encounterData, { responseType: 'text' });
  }
}
