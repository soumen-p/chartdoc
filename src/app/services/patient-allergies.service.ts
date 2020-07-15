import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Allergies } from '../models/patient-allergies.model';
import { environment } from 'src/environments/environment';
import { SharedService } from '../core/shared.service';

@Injectable({
  providedIn: 'root'
})
export class PatientAllergiesService {
  patientId: string;
  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }
  getAllergies(patientId: string, flag: string): Observable<any> {
    const epicEndPoint = 'api/FHIR/DSTU2/AllergyIntolerance';
    const baseEndPoint = 'api/ChartDoc/GetAllergies';
    const queryString = `?patient=${patientId}`;
    if (flag === 'E') {
      return this.httpClient.get(environment.epicApiUrl + epicEndPoint + queryString);
    } else {
      patientId = btoa(patientId);
      return this.httpClient.get(environment.baseUrl + baseEndPoint + `/${patientId}`);
    }
  }
  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
  getAllergiesInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  setAllergiesInfo(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
}
