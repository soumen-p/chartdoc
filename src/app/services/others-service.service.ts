import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';
import { observable, Observable } from 'rxjs';
import { Others } from '../models/others';
import { OtherSave } from '../models/other-save';


const SAVEOTHERS = 'api/ChartDoc/SaveOthersDetails';
const GETCATEGORYDETAILS = 'api/ChartDoc/GetCategoryDetails';
const DELETEOTHERSDETAILS = 'api/ChartDoc/DeleteOthersDetails';
const GETOTHERSDETAILS = 'api/ChartDoc/OtherPopulate/';

@Injectable({
  providedIn: 'root'
})
export class OthersServiceService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getTypes(): Observable<Others[]> {
    return this.http.get<Others[]>(environment.baseUrl + GETCATEGORYDETAILS);
  }

  public getOthers(TypeId: string): Observable<any> {
    return this.http.get<any>(environment.baseUrl + GETOTHERSDETAILS + TypeId);
  }
  public saveOther(request: OtherSave): Observable<any> {
    return this.http.post(environment.baseUrl + SAVEOTHERS, request, { responseType: 'text' });
  }
  public deleteOther(sOthers: any): Observable<any> {
    return this.http.post(environment.baseUrl + DELETEOTHERSDETAILS, sOthers, { responseType: 'text' })
  }
}
