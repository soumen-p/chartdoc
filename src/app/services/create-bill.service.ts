import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

const GET_MASTERDATA = 'api/ChartDoc/OtherPopulate';
const getDoctorListUrl = 'api/ChartDoc/GetDoctorList/';
const getServiceDetailsUrl = 'api/ChartDoc/GetServiceDetails/';
const getReasonsUrl = 'api/ChartDoc/GetReason/';

const getChargePatientHeaderUrl = 'api/ChartDoc/GetChargePatientHeader/';
const getChargePatientDetailUrl = 'api/ChartDoc/GetChargePatientDetails/';
const Save_Claim = 'api/ChartDoc/SaveClaim/';
const GETREASON = 'api/ChartDoc/GetReason';
const getClaimFieldsHeader = 'api/ChartDoc/GetClaimFieldsHeader';
const getClaimFieldsDetails = 'api/ChartDoc/GetClaimFieldsDetails';
const savePatientChargeClaimFields = 'api/ChartDoc/SavePatientChargeClaimFields';
const getInsuranceClaimFields = 'api/ChartDoc/GetInsuranceClaimFields';
const getClaimStatus = 'api/ChartDoc/GetClaimStatus';
@Injectable({
  providedIn: 'root'
})
export class CreateBillService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) { }

  public getDoctorList(strdate: string): Observable<any> {
    const baseUrl = getDoctorListUrl;
    const querystring = strdate;

    return this.http.get(environment.baseUrl + baseUrl + querystring);
  }
  public getAllReasons(): Observable<any> {
    return this.http.get(environment.baseUrl + getReasonsUrl + '-3');
  }

  public getServiceDetails(): Observable<any> {
    const baseUrl = getServiceDetailsUrl;

    return this.http.get(environment.baseUrl + baseUrl);
  }
  public setBookingInfo(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
  getBookingInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }

  public getChargePatientHeader(appointmentId: string): Observable<any> {
    const baseUrl = getChargePatientHeaderUrl;
    const querystring = appointmentId;

    return this.http.get(environment.baseUrl + baseUrl + querystring);
  }
  public getChargePatientDetails(appointmentId: string): Observable<any> {
    const baseUrl = getChargePatientDetailUrl;
    const querystring = appointmentId;

    return this.http.get(environment.baseUrl + baseUrl + querystring);
  }
  public saveClaim(request: object): Observable<any> {
    const apiURL = environment.baseUrl + Save_Claim;
    // var apiURL="http://localhost:14403/" + SAVE_PATIENT;
    return this.http.post(apiURL, request, { responseType: 'text' });
  }
  public getReason(param: string): Observable<any> {
    return this.http.get(environment.baseUrl + GETREASON + '/' + param);
  }
  public setsubmitclaimInfo(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
  getsubmitclaimInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }
  public getClaimFieldsHeader(): Observable<any> {
    return this.http.get(environment.baseUrl + getClaimFieldsHeader);
  }
  public getClaimFieldsDetails(param: string): Observable<any> {
    return this.http.get(environment.baseUrl + getClaimFieldsDetails+ '?id=' + param);
  }
  public savePatientChargeClaimFields(request: object): Observable<any> {
    const apiURL = environment.baseUrl + savePatientChargeClaimFields;
    return this.http.post(apiURL, request, { responseType: 'text' });
  }
  public getInsuranceClaimFields(param: string): Observable<any> {
    return this.http.get(environment.baseUrl + getInsuranceClaimFields+ '?chargeId=' + param);
  }
  public getClaimStatus(): Observable<any> {
    return this.http.get(environment.baseUrl + getClaimStatus);
  }
  public getMasterData(key: string): Observable<any> {
    const apiURL = environment.baseUrl + GET_MASTERDATA;
    // var apiURL="http://localhost:14403/" + GET_PATIENTINFO;
    return this.http.get(apiURL + `/${key}`);
  }
}
