import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../core/shared.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const VIEW_OFFICECALENDAR = "api/ChartDoc/AppointmentWeeklyView/";
@Injectable({
  providedIn: 'root'
})
export class DoctorCalendarService {

 
  constructor(private http: HttpClient, private sharedService: SharedService) { }
  
  public getAllCalendar(date:string,DoctorID:string):Observable<any>{    
    return this.http.get(environment.baseUrl + VIEW_OFFICECALENDAR+date+'/'+DoctorID);
  }
  public getLocalStorage(doctorInfo: string){
    return this.sharedService.getLocalItem(doctorInfo);
  }
}
