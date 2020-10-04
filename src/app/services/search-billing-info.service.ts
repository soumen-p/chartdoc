import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchBillingResponse } from '../billing/model/searchBillingResponse.model';
const searchBillingInfo = 'api/ChartDoc/GetAppointmentList/';
@Injectable({
  providedIn: 'root'
})
export class SearchBillingInfoService {

  constructor(private http: HttpClient) { }
  public searchBillingInfo(fromDate: string, toDate: string, patientName: string, feeTicket: string, providerId: number, statusId: string): Observable<SearchBillingResponse[]> {
   // return this.http.get(environment.baseUrl + searchBillingInfo + "?fromDate="+fromDate + '&toDate=' + toDate + '&providerId=' + providerId + '&statusId=' + statusId);
    return this.http.get<SearchBillingResponse[]>(environment.baseUrl+searchBillingInfo +'?statusId=' + statusId)
  }
}
