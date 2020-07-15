import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const baseEndPointFamiles = 'api/ChartDoc/GetFamilies';
const baseEndPointSocials = 'api/ChartDoc/GetSocials';
@Injectable({
  providedIn: 'root'
})
export class PatientSocialFamilyService {
  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }

  getSocialDetails(patientId: string, flag: string): Observable<any> {
    patientId = btoa(patientId);
    return this.httpClient.get(environment.baseUrl + baseEndPointSocials + `/${patientId}`);
  }
  getFamilyDetails(patientId: string, flag: string): Observable<any> {
    patientId = btoa(patientId);
    return this.httpClient.get(environment.baseUrl + baseEndPointFamiles + `/${patientId}`);
  }
  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
}
