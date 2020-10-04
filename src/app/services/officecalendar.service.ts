import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';


const SAVE_CALENDAR = "api/ChartDoc/SAVECALENDER";

const VIEW_CALENDAR = "api/ChartDoc/GETCALENDER";
const VIEW_OFFICECALENDARLIST = "api/ChartDoc/GetOfficeCalenderList/";
const VIEW_DELETECALENDAR= "api/ChartDoc/DeleteCalender/";
@Injectable({
  providedIn: 'root'
})
export class OfficeCalendarService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }
  
  
  public saveCalendar(request:object):Observable<any>{ 
    
    
    return this.http.post(environment.baseUrl +SAVE_CALENDAR,request,{responseType: 'text'});
   
  }
  public getAllCalendar():Observable<any>{    
    return this.http.get(environment.baseUrl + VIEW_CALENDAR);
  }
  public setCalendar(key: string, val: any){
    this.sharedService.setLocalItem(key, val);
  }
  
  getCalendar(key: string){
    return this.sharedService.getLocalItem(key);
  }
  public getOfficeCalenderList(val: string):Observable<any>{    
    const querystring = val;
    return this.http.get(environment.baseUrl + VIEW_OFFICECALENDARLIST + querystring);
  }
  public deleteCalendar(val: string):Observable<any>{    
    const querystring = val;
    return this.http.post(environment.baseUrl + VIEW_DELETECALENDAR + querystring, { responseType: 'text' });
  }

  public hourreturn(val:any){
    if(val==1){
      return 13
    }
    else if(val==2){
      return 14
    }
    else if(val==3){
      return 15
    }
    else if(val==4){
      return 16
    }
    else if(val==5){
      return 17
    }
    else if(val==6){
      return 18
    }
    else{
      return val
    }
  }
}
