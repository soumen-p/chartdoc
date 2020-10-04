import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const Delete = 'api/ChartDoc/DeleteReason';
const Save = 'api/ChartDoc/SaveReason';

@Injectable({
  providedIn: 'root'
})
export class ReasonMasterService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }
  public saveReason(request: object): Observable<any> {
    return this.http.post(environment.baseUrl + Save, request, { responseType: 'text' });
  }
  public deleteReason(request: object): Observable<any> {
    return this.http.post(environment.baseUrl + Delete, request, { responseType: 'text' });
  }
  obj:any
  setReasonbyid(value:any){
    this.obj=value;

  }
  getReasonbyid(){
    return this.obj

  }
}
