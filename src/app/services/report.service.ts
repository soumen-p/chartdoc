
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

// const SAVE_PATIENT = "api/ChartDoc/CreatePatient";
const GET_PaymentDetails = 'api/ChartDoc/GetPartyLedger';
const Get_PatientBalance = 'api/ChartDoc/GetPatientBalance';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient,
    private sharedService: SharedService
    ) { }
  
 
  
 

public getHeaderPatientSearchId(key: string) {
  return this.sharedService.getLocalItem(key);
}
public setPaymentId(key: string, val: any) {
  this.sharedService.setLocalItem(key, val);
}

public getPaymentId(key: string) {
  return this.sharedService.getLocalItem(key);
}
public setTxnTypeInfo(key: string, val: any) {
  this.sharedService.setLocalItem(key, val);
}

public getTxnTypeInfo(key: string) {
  return this.sharedService.getLocalItem(key);
}

public setReasonInfo(key: string, val: any) {
  this.sharedService.setLocalItem(key, val);
}

public getReasonInfo(key: string) {
  return this.sharedService.getLocalItem(key);
}
public setDateInfo(key: string, val: any) {
  this.sharedService.setLocalItem(key, val);
}
public getDateInfo(){
 return this.sharedService.getLocalItem('dateInfo');
}

getPatinetData() {
  return this.sharedService.getBookingInfo('patientInfo');
}
public GetPartyLedger(fromDate: string, toDate: string, patientId: string)
: Observable<any> {
  if (fromDate == null)
    fromDate = "";
  if (toDate == null)
    toDate = "";
  if (patientId == null)
    patientId = "";
  
  const querystring = "/{" + fromDate + "}" + "/{" + toDate + "}" + "/{" + patientId + "}";
  const apiURL = environment.baseUrl + GET_PaymentDetails+ querystring;
  return this.http.get(apiURL);
}
public GetPatientBalance( patientId: string)
: Observable<any> {
  
  if (patientId == null)
    patientId = "";
  
  const querystring =  "/{" + patientId + "}";
  const apiURL = environment.baseUrl + Get_PatientBalance+ querystring;
  return this.http.get(apiURL);
}
}