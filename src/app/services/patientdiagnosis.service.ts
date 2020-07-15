import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const documentBaseUrl = 'api/ChartDoc/GetDocument';
const diagnosisBaseUrl = 'api/ChartDoc/GetDiagnosisByPatientId';
const diagnosisUploadDaveUrl = 'api/ChartDoc/SaveDiagnosis';
@Injectable({
  providedIn: 'root'
})
export class PatientdiagnosisService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }
  public getPatientDiagnosis(patientId: string, flag: string): Observable<any> {
    const epicEndPoint = 'api/FHIR/DSTU2/DiagnosticReport';
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');
    if (flag === 'E') {
      return this.http.get(environment.epicApiUrl + epicEndPoint + `?patient=${patientId}`, {headers: myHeaders});
    }    else {
      patientId = btoa(patientId);
      return this.http.get(environment.baseUrl + diagnosisBaseUrl + `/${patientId}`, {headers: myHeaders});
    }
  }

  public getDocumentByPatientId(patientId: string, flag: string, id: number): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');
    patientId = btoa(patientId);
    return this.http.get(environment.baseUrl + documentBaseUrl + `/${patientId}/${flag}/${id}`, {headers: myHeaders});
  }
  saveDiagnosisDetails(request: FormData): Observable<any> {
    return this.http.post(environment.baseUrl + diagnosisUploadDaveUrl, request, {responseType: 'text'});
  }

  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
  getBookingInfo(Key: string) {
    return this.sharedService.getLocalItem(Key);
  }

  getDiagnosisDetails(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  setDiagnosisDetails(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  getDocumentDetails(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  setDocumentDetails(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
}
