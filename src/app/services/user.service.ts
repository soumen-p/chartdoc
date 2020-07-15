import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin } from 'rxjs';

const GetValue = 'api/ChartDoc/GetUTYPE/';
const Getdept = 'api/ChartDoc/Getdept';
const Getrole = 'api/ChartDoc/GetRole';
const AddUser = 'api/ChartDoc/SaveUserNew';
const userList = 'api/ChartDoc/GetUserList';
const changeStatus = 'api/ChartDoc/updateStatusOfUser/';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getRoleType(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + GetValue + id);
  }
  public getSpeciality(): Observable<any> {
    return this.http.get(environment.baseUrl + Getdept);
  }
  public getRole(): Observable<any> {
    return this.http.get(environment.baseUrl + Getrole);
  }
  public addUser(request: FormData): Observable<any> {
    return this.http.post(environment.baseUrl + AddUser,
      request, { responseType: 'text' }
    );
  }
  public getUserList(): Observable<any> {
    return forkJoin([this.http.get(environment.baseUrl + userList + '?UserType=1'), this.http.get(environment.baseUrl + userList + '?UserType=2'), this.http.get(environment.baseUrl + userList + '?UserType=3')]);
    // return this.http.get(environment.baseUrl + userList);
  }
  public updateStatus(Id: string, status: number): Observable<any> {
    return this.http.get(environment.baseUrl + changeStatus + Id + '/' + status);
  }
}
