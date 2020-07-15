import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../core/shared.service';


const localBaseUrl = 'api/ChartDoc';
const epiclBaseUrl = 'api/ChartDoc';

@Injectable({
  providedIn: 'root'
})
export class PatientFollowupService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public GetPatientFollowup(patientId: string, flag: string): Observable<any> {

    const endpoint = '/GetFollowUp/';
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');
    if (flag === 'L') {
      return this.http.get(environment.baseUrl + localBaseUrl + endpoint + `${patientId}`, { headers: myHeaders });
    } else {
      return this.http.get(environment.baseUrl + localBaseUrl + endpoint + `${patientId}`, { headers: myHeaders });
    }
  }
  saveFolloUp(FollowUpData: any): Observable<any> {
    const saveEndpoint = 'api/ChartDoc/SaveFollowUp';
    return this.http.post(environment.baseUrl + saveEndpoint, FollowUpData, { responseType: 'text' });
  }
  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
  getBookingInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  getLatestFollowUp(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  setFollowUp(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
}
