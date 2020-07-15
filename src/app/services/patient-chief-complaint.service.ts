import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const baseUrl = 'api/ChartDoc/';
const epiclbaseUrl = 'api/ChartDoc';

@Injectable({
  providedIn: 'root'
})
export class PatientChiefComplaintService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getPatientCC(patientId: string, flag: string): Observable<any> {

    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');

    if (flag === 'L') {
      return this.http.get(environment.baseUrl + baseUrl + `GetChiefComplaint/${patientId}`, { headers: myHeaders });
    } else { // require to use epic url
      return this.http.get(environment.baseUrl + baseUrl + `GetChiefComplaint/${patientId}`, { headers: myHeaders });
    }
  }

  public saveCc(ccInfo: any): Observable<any> {
    return this.http.post(environment.baseUrl + baseUrl + `SaveChiefComplaint`, ccInfo, { responseType: 'text' });
  }

  setChiefComplaintValue(key: string, val: string) {
    this.sharedService.setLocalItem(key, val);
  }

  getChiefComplaintValue(key: string): string {
    return this.sharedService.getLocalItem(key);
  }

  getBookingInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
}
