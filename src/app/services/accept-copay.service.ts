import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';
import { CoPay } from '../models/co-pay';


const Get_PaymentType_Url="api/ChartDoc/otherpopulate/";
const SAVE_COPAY="api/ChartDoc/Savecopay";
const Get_Copay_Url="api/ChartDoc/GetCOPay/";
@Injectable({
  providedIn: 'root'
})
export class AcceptcopayService {

  constructor(private _http: HttpClient,
              private sharedService: SharedService) { }

  
  public getPaymentType(id: string): Observable<any>{
    const base_url = Get_PaymentType_Url;
    const querystring = id;

    return this._http.get(environment.baseUrl + base_url + querystring);
  }
  public saveCopay(request:object):Observable<any>{ 
    return this._http.post(environment.baseUrl +SAVE_COPAY,request,{responseType: 'text'});
  }
  public setBookingInfo(key: string, val: any){
    this.sharedService.setLocalItem(key, val);
  }

  getCopayDetails(AppointmentID:string): Observable<any>{
    const base_url = Get_Copay_Url;
    const querystring = AppointmentID;
    
    return this._http.get(environment.baseUrl + base_url + querystring);
  }
  
  getBookingInfo(key: string){
    return this.sharedService.getLocalItem(key);
  }
  getCopayAppId(key: string){
    return this.sharedService.getLocalItem(key);
  }
}
