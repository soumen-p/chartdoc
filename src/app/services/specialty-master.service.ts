import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChargeCPTModel } from '../models/ChargeCPT.model';

const SPECIALTY = 'api/ChartDoc/GetDept';
const SAVESPECIALTY = 'api/ChartDoc/SaveDepartment';
const DELETESPECIALTY = 'api/ChartDoc/DeleteDepartment';

const CHARGEDATES = "api/ChartDoc/GetChargeDateRange";
const SAVECHARGEDATES = "api/ChartDoc/SaveChargeDateRange";

const CHARGEDETAILS = "api/ChartDoc/GetChargeDetails";
const SAVECHARGEDETAILS = "api/ChartDoc/SaveChargeDetails";

@Injectable({
  providedIn: 'root'
})
export class SpecialtyMasterService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }
  public getAllSpecialty(): Observable<any> {
    return this.http.get(environment.baseUrl + SPECIALTY);
  }
  public saveSpecialty(request: object): Observable<any> {
    return this.http.post(environment.baseUrl + SAVESPECIALTY, request, { responseType: 'text' }
    );
  }
  public DeleteSpecialty(request: object) {
    return this.http.post(environment.baseUrl + DELETESPECIALTY, request, { responseType: 'text' });
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

  saveChargeDetails(cptDetailsData: ChargeCPTModel): Observable<any> {
    return this.http.post(environment.baseUrl + SAVECHARGEDETAILS, cptDetailsData, {responseType: 'text'});

  }
  
}
