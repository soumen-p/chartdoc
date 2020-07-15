import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const documentBaseUrl = 'api/ChartDoc/GetDocument';
const procedureUploadUrl = 'api/ChartDoc/SaveProcedure';
@Injectable({
  providedIn: 'root'
})
export class PatientProceduresService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }
  public GetPatientProcedures(patientId: string, flag: string): Observable<any> {
    const epicEndpoint = 'api/FHIR/DSTU2/Procedure';
    const baseEndpoint = 'api/ChartDoc/GetProceduresByPatientId';
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');
    if (flag === 'E') {
      return this.http.get(environment.epicApiUrl + epicEndpoint,
        { params: new HttpParams().set('patient', patientId), headers: myHeaders });
    } else {
      patientId = btoa(patientId);
      return this.http.get(environment.baseUrl + baseEndpoint + `/${patientId}`, { headers: myHeaders });
    }
  }
  public GetDocumentByPatientId(patientId: string, flag: string, id: number): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');
    patientId = btoa(patientId);
    return this.http.get(environment.baseUrl + documentBaseUrl + `/${patientId}/${flag}/${id}`, { headers: myHeaders });
  }

  saveProcedureDetails(request: FormData): Observable<any> {
    return this.http.post(environment.baseUrl + procedureUploadUrl, request, { responseType: 'text' });
  }

  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }

  getBookingInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  getProcedureDetails(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  setProcedureDetails(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  getDocumentDetails(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  setDocumentDetails(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
}
