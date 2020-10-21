import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChargeCPTModel } from '../models/ChargeCPT.model';

const SERVICES = 'api/ChartDoc/GetServiceDetails';
const SAVESERVICE = 'api/ChartDoc/SaveServiceDetails';
const DELETESERVICE = 'api/ChartDoc/DeleteServiceDetails';

const CHARGEDATES = "api/ChartDoc/GetChargeDateRange";
const SAVECHARGEDATES = "api/ChartDoc/SaveChargeDateRange";

const CHARGEDETAILS = "api/ChartDoc/GetChargeDetails";
const SAVECHARGEDETAILS = "api/ChartDoc/SaveChargeDetails";

@Injectable({
  providedIn: 'root'
})
export class ServiceMasterService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }
  public getAllServices(): Observable<any> {
    return this.http.get(environment.baseUrl + SERVICES);
  }
  public saveService(request: object): Observable<any> {
    return this.http.post(environment.baseUrl + SAVESERVICE, request, { responseType: 'text' }
    );
  }
  public DeleteService(request: object) {
    return this.http.post(environment.baseUrl + DELETESERVICE, request, { responseType: 'text' });
  }

   // Charge Date methods ...

   public getAllChargeDates(fromDate : string, toDate : string): Observable<any> {
    return this.http.get(environment.baseUrl + CHARGEDATES + "?fromDate=" + fromDate + "&toDate=" + toDate);
  }

  public saveChargeDate(request: object): Observable<any> {
    return this.http.post(environment.baseUrl + SAVECHARGEDATES, request, {responseType: 'text'}
    );
  }

   // Charge Master methods ...

   public getChargeDetails(chargeYearId : number): Observable<any> {

    return this.http.get(environment.baseUrl + CHARGEDETAILS + "/" + chargeYearId );
  }

  saveChargeDetails(cptDetailsData: ChargeCPTModel[]): Observable<any> {
    return this.http.post(environment.baseUrl + SAVECHARGEDETAILS, cptDetailsData, {responseType: 'text'});

  }
  
}
