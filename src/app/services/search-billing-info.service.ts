import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchBillingResponse } from '../billing/model/searchBillingResponse.model';
const searchBillingInfo = 'api/ChartDoc/GetAppointmentList';
@Injectable({
  providedIn: 'root'
})
export class SearchBillingInfoService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }
  public searchBillingInfo(fromDate: string, toDate: string, patientId: string, feeTicket: string, providerId: number, statusId: string): Observable<SearchBillingResponse[]> {

    if (fromDate == null)
      fromDate = "";
    if (toDate == null)
      toDate = "";
    if (patientId == null)
      patientId = "";
    if (feeTicket == null)
      feeTicket = "";
    else {
      feeTicket = feeTicket.replace("/", "-")
    }
    if (providerId == null)
      providerId = 0;
    const querystring = "/{" + fromDate + "}" + "/{" + toDate + "}" + "/{" + patientId + "}" + "/{" + feeTicket + "}" + "/{" + providerId + "}" + "/{" + statusId + "}";

    // return this.http.get(environment.baseUrl + searchBillingInfo + "?fromDate="+fromDate + '&toDate=' + toDate + '&providerId=' + providerId + '&statusId=' + statusId);
    //return this.http.get<SearchBillingResponse[]>(environment.baseUrl+searchBillingInfo +'?statusId=' + statusId)
    return this.http.get<SearchBillingResponse[]>(environment.baseUrl + searchBillingInfo + querystring)

  }
  getPatinetData() {
    return this.sharedService.getBookingInfo('patientInfo');
  }
  setDateInfo(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }
  getDateInfo(){
   return this.sharedService.getLocalItem('dateInfo');
  }
}
