
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

// const SAVE_PATIENT = "api/ChartDoc/CreatePatient";
const GET_PaymentDetails = 'api/ChartDoc/GetPaymentDetails';
const GET_PaymentBreakUp = 'api/ChartDoc/GetPaymentBreakUp';
const GET_PaymentList = 'api/ChartDoc/GetPaymentList';
const GET_PatientAdjustment = 'api/ChartDoc/GetChargePatientAdjustment';
const SAVE_Payment= 'api/ChartDoc/SavePaymentDetails';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient,
    private sharedService: SharedService
    ) { }
  
 public getPaymentDetails(patientId: any,paymentId: any): Observable<any> {

  //const myHeaders = new HttpHeaders();
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Accept', 'text/plain');

     const apiURL = environment.baseUrl + GET_PaymentDetails;
    // // return this.http.get(apiURL + `/${patientId}/${paymentId}`); // `/${userName}/${password}`);  +date+'/'+DoctorID
    // //return this.http.get(apiURL +`?paymentId=${paymentId}&patientId=${patientId}`); // `/${userName}/${password}`);  
    // return this.http.get(apiURL  + `/${paymentId}/${patientId}`, {headers: myHeaders});

    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');
    //patientId = btoa(patientId);
    return this.http.get(apiURL + `/${paymentId}/${patientId}`, {headers: myHeaders});

  }
  
  public getPaymentBreakup(patientId: any,paymentId: any): Observable<any> {
       const apiURL = environment.baseUrl + GET_PaymentBreakUp;
      const myHeaders = new HttpHeaders();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Accept', 'text/plain');
      return this.http.get(apiURL + `/${paymentId}/${patientId}`, {headers: myHeaders});
    }

  public getPaymentList(): Observable<any> {
    const apiURL = environment.baseUrl + GET_PaymentList;
    return this.http.get(apiURL);
  }
  public getChargePatientAdjustment(chargeId: any): Observable<any> {
    const apiURL = environment.baseUrl + GET_PatientAdjustment;
    return this.http.get(apiURL + `/${chargeId}`);
  }

  
  public savePayment(request: object): Observable<any> {
    const apiURL = environment.baseUrl + SAVE_Payment;
    return this.http.post(apiURL, request, {responseType: 'text'});
 }
 public setPatientSearchTypeInfo(key: string, val: any) {
  this.sharedService.setLocalItem(key, val);
}

public getPatientSearchTypeInfo(key: string) {
  return this.sharedService.getLocalItem(key);
}
public setHeaderPatientSearchId(key: string, val: any) {
  this.sharedService.setLocalItem(key, val);
}

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
public searchPayment(fromDate: string, toDate: string, patientId: string)
: Observable<any> {
  if (fromDate == null)
    fromDate = "";
  if (toDate == null)
    toDate = "";
  if (patientId == null)
    patientId = "";
  
  const querystring = "/{" + fromDate + "}" + "/{" + toDate + "}" + "/{" + patientId + "}";
  const apiURL = environment.baseUrl + GET_PaymentList+ querystring;
  return this.http.get(apiURL);
}

}