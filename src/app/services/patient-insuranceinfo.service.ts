import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';


const baseEndPoint = 'api/ChartDoc/GetInsurance';

@Injectable({
  providedIn: 'root'
})
export class PatientInsuranceinfoService {
  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }
  getInsuranceInfo(patientId: string, flag: string): Observable<any> {
    patientId = btoa(patientId);
    return this.httpClient.get(environment.baseUrl + baseEndPoint + `/${patientId}`);
  }
  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
}
