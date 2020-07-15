import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const SAVE_PATIENT = "api/ChartDoc/CreatePatient";
const GET_ChargePatientHeader = 'api/ChartDoc/GetChargePatientHeader';
const GET_ChargePatientDetails = 'api/ChartDoc/GetChargePatientDetails';
const GET_PatientAdjustment = 'api/ChartDoc/GetChargePatientAdjustment';
const SAVE_Claim = 'api/ChartDoc/SaveClaim';

@Injectable({
  providedIn: 'root'
})
export class EobService {
  constructor(private http: HttpClient) { }
  
 public getChargePatientHeader(appointmentId: any): Observable<any> {
    const apiURL = environment.baseUrl + GET_ChargePatientHeader;
    // var apiURL="http://localhost:14403/" + GET_PATIENTINFO;
    return this.http.get(apiURL + `/${appointmentId}`);
  }
  
  public getChargePatientDetails(appointmentId: any): Observable<any> {
    const apiURL = environment.baseUrl + GET_ChargePatientDetails;
    // var apiURL="http://localhost:14403/" + GET_PATIENTINFO;
    return this.http.get(apiURL + `/${appointmentId}`);
  }
  public getChargePatientAdjustment(chargeId: any): Observable<any> {
    const apiURL = environment.baseUrl + GET_PatientAdjustment;
    // var apiURL="http://localhost:14403/" + GET_PATIENTINFO;
    return this.http.get(apiURL + `/${chargeId}`);
  }

  
  public saveClaim(request: object): Observable<any> {
    const apiURL = environment.baseUrl + SAVE_Claim;
   // var apiURL="http://localhost:14403/" + SAVE_PATIENT;
    return this.http.post(apiURL, request, {responseType: 'text'});
 }
 
}
