import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../core/shared.service';
import { PatientImpressionPlanComponent } from '../patient-profile/patient-impression-plan/patient-impression-plan.component';

const LocalBaseUrl = 'api/ChartDoc/';
// const epiclBASE_URL = 'api/ChartDoc';

@Injectable({
  providedIn: 'root'
})
export class PatientImpressionPlanService {

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

  public getPatientImpressionplan(patientId: string, flag: string): Observable<any> {

    const endpoint = 'GetImpressionPlan/';

    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');

    if (flag === 'L') {
      return this.http.get(environment.baseUrl + LocalBaseUrl + endpoint + `${patientId}`, { headers: myHeaders });
    } else {
      // require to use epic url
      return this.http.get(environment.baseUrl + LocalBaseUrl + endpoint + `${patientId}`, { headers: myHeaders });
    }
  }

  setImpressionPlanValue(key: string, val: string) {
    this.sharedService.setLocalItem(key, val);
  }

  getImpressionPlanValue(key: string): string {
    return this.sharedService.getLocalItem(key);
  }

  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }

  saveImpressionPlan(impressionPlanInfo: any): Observable<any> {
    
    return this.http.post(environment.baseUrl + LocalBaseUrl + 'SaveImpressionPlan', impressionPlanInfo, { responseType: 'text' });

  }


}
