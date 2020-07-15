import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const epicEndPoint = 'api/FHIR/DSTU2/Immunization';
const baseEndPoint = 'api/ChartDoc/Getimmunizations';

@Injectable({
  providedIn: 'root'
})
export class PatientImmunizationService {

  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }
  getImmunizations(patientId: string, flag: string): Observable<any> {
    if (flag === 'E') {
      return this.httpClient.get(environment.epicApiUrl + epicEndPoint + `?patient=${patientId}`) ;
    } else {
      patientId = btoa(patientId);
      return this.httpClient.get(environment.baseUrl + baseEndPoint + `/${patientId}`);
    }
  }
  getPatientDetails(patientInfo: string){
    return this.sharedService.getLocalItem(patientInfo);
  }
}
