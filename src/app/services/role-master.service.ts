import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const Delete = 'api/ChartDoc/DeleteRole';
const Save = 'api/ChartDoc/SaveRole';
const GetValue = 'api/ChartDoc/GetUTYPE/';
@Injectable({
  providedIn: 'root'
})
export class RoleMasterService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }
  public saveRole(request: object): Observable<any> {
    return this.http.post(environment.baseUrl + Save, request, { responseType: 'text' });
  }
  public deleteRole(request: object): Observable<any> {
    return this.http.post(environment.baseUrl + Delete, request, { responseType: 'text' });
  }
  public getRole(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + GetValue + id);
  }
  obj:any
  setRolebyid(value:any){
    this.sharedService.setLocalItem("role", value);

  }
  getRolebyid(){
    return this.sharedService.getLocalItem("role");

  }
}
