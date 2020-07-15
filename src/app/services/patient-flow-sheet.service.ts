import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = 'api/chartdoc/GetFlowsheet/';
const SaveFloesheetUrl = 'api/chartdoc/UpdateFloorArea/';
const updateMarkinStatusUrl = 'api/chartdoc/UpdateMarkReady/';
const saveCheckOutUrl = 'api/chartdoc/UpdateCheckOutStatus/';

@Injectable({
  providedIn: 'root'
})
export class PatientFlowSheetService {

  constructor(private http: HttpClient) { }

  public saveCheckOut(AppointmentID: string, ReasonCode: string): Observable<any> {
    return this.http.get(environment.baseUrl + saveCheckOutUrl + AppointmentID + '/\'\'', { responseType: 'text' });
  }

  public getAppointmentDetail(date: string, doctorId: string): Observable<any> {
    return this.http.get(environment.baseUrl + baseUrl + date + '/' + doctorId);
  }
  public updateAppoinmentDetail(AppointmentID: string, RoomNO: string, Flowarea: string): Observable<any> {
    return this.http.get(environment.baseUrl + SaveFloesheetUrl + AppointmentID + '/' + RoomNO + '/' + Flowarea);
  }
  public updateMarkStatus(AppointmentID: string, Status: boolean): Observable<any> {

    return this.http.get(environment.baseUrl + updateMarkinStatusUrl + AppointmentID + '/' + Status);

  }
}
