import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientValidation } from '../models/patient-validation.model';

// const SAVE_PATIENT = "api/ChartDoc/CreatePatient";
const VALIDATE_PATIENT = 'api/ChartDoc/ValidatePatient';
const SAVE_PATIENT = 'api/ChartDoc/CreatePatientNew';
const SAVE_PATIENTOTHERS = 'api/ChartDoc/SaveAllergyImmunization';
const GET_PATIENTINFO = 'api/ChartDoc/GetPatientInfo';
const GET_MASTERDATA = 'api/ChartDoc/OtherPopulate';
const GET_IMMUNIZATIONS = 'api/ChartDoc/GetImmunizations';
const GETALLERGIES = 'api/ChartDoc/GetAllergies';
const FILE_UPLOAD = 'api/ChartDoc/FileUpload';
const GETSOCIALS = 'api/ChartDoc/GetSocials';
const GETFAMILES = 'api/ChartDoc/GetFamilies';
const GETAlert = 'api/ChartDoc/GetAlert';
@Injectable({
  providedIn: 'root'
})
export class PatientCreateService {
  constructor(private http: HttpClient) { }

  public savePatient(request: object): Observable<any> {
    const apiURL = environment.baseUrl + SAVE_PATIENT;
    // var apiURL="http://localhost:14403/" + SAVE_PATIENT;
    return this.http.post(apiURL, request, { responseType: 'text' });
  }

  public getPatientInfoByPatientId(patientId: string): Observable<any> {
    const apiURL = environment.baseUrl + GET_PATIENTINFO;
    // var apiURL="http://localhost:14403/" + GET_PATIENTINFO;
    return this.http.get(apiURL + `/${patientId}`);
  }

  public getMasterData(key: string): Observable<any> {
    const apiURL = environment.baseUrl + GET_MASTERDATA;
    // var apiURL="http://localhost:14403/" + GET_PATIENTINFO;
    return this.http.get(apiURL + `/${key}`);
  }

  public patientOtherService(request: object): Observable<any> {
    const apiURL = environment.baseUrl + SAVE_PATIENTOTHERS;
    // var apiURL="http://localhost:14403/" + SAVE_PATIENT;
    return this.http.post(apiURL, request, { responseType: 'text' });
  }
  public getImmunizations(PatientId: string): Observable<any> {
    const apiURL = environment.baseUrl + GET_IMMUNIZATIONS;
    // var apiURL="http://localhost:14403/" + Get_IMMUNIZATIONS;
    PatientId = btoa(PatientId);
    return this.http.get(apiURL + `/${PatientId}`);
  }
  public getAllergies(PatientId: string): Observable<any> {
    const apiURL = environment.baseUrl + GETALLERGIES;
    PatientId = btoa(PatientId);
    // var apiURL="http://localhost:14403/" + GETALLERGIES;
    return this.http.get(apiURL + `/${PatientId}`);
  }
  public getSocials(PatientId: string): Observable<any> {
    const apiURL = environment.baseUrl + GETSOCIALS;
    PatientId = btoa(PatientId);
    // var apiURL="http://localhost:14403/" + GETALLERGIES;
    return this.http.get(apiURL + `/${PatientId}`);
  }
  public getFamilies(PatientId: string): Observable<any> {
    const apiURL = environment.baseUrl + GETFAMILES;
    PatientId = btoa(PatientId);
    // var apiURL="http://localhost:14403/" + GETALLERGIES;
    return this.http.get(apiURL + `/${PatientId}`);
  }
  fileUpload(formData: object) {
    // var apiURL=environment.baseUrl + FILE_UPLOAD;
    const apiURL = 'http://localhost:14403/' + FILE_UPLOAD;
    return this.http.post<any>(apiURL, formData);
  }
  public getPatientAlert(PatientId: string): Observable<any> {
    const apiURL = environment.baseUrl + GETAlert;
    PatientId = btoa(PatientId);
    // var apiURL="http://localhost:14403/" + GETALLERGIES;
    return this.http.get(apiURL + `/${PatientId}`);
  }

  public patientValidation(patientValidate: PatientValidation): Observable<any>{
    const apiURL = environment.baseUrl + VALIDATE_PATIENT;
    return this.http.get(apiURL + `?patientId=${patientValidate.patientId}&patientfName=${patientValidate.patientfName}&patientmName=${patientValidate.patientmName}&patientlName=${patientValidate.patientlName}&dob=${patientValidate.dob}&ssn=${patientValidate.ssn}&gender=${patientValidate.gender}`);
  }
}
