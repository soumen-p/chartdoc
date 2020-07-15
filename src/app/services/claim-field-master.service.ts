import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const getClaimFieldsHeaderUrl = "api/ChartDoc/GetClaimFieldsHeader";
const getClaimFieldsDetailsUrl = "api/ChartDoc/GetClaimFieldsMaster";
const saveClaimFieldsUrl = "api/ChartDoc/SaveClaimFieldMaster";

@Injectable({
  providedIn: 'root'
})
export class ClaimFieldMasterService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getClaimFieldsHeader(): Observable<any> {

    return this.http.get(environment.baseUrl + getClaimFieldsHeaderUrl );
  }

  public getClaimFieldsDetails(id: any): Observable<any> {

    return this.http.get(environment.baseUrl + getClaimFieldsDetailsUrl + "?id=" + id );
  }

  saveClaimFieldsDetails(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + saveClaimFieldsUrl, data, {responseType: 'text'});

  }
}
