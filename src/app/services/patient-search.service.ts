import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';

// const BASE_URL="api/FHIR/DSTU2/patient";
const All_Patients_Url = "api/ChartDoc/GetAllPatients";
const Search_Patients_Url = "api/ChartDoc/SearchPatient";
const PatientSearch_Url = "api/ChartDoc/SearchPatient";



@Injectable({
  providedIn: 'root'
})
export class PatientSearchService {

  tempDobVal: any;

  constructor(private _http: HttpClient,
    private sharedService: SharedService) { }

  public searchPatients(givenName: string, familyName: string): Observable<any> {
    const base_url = (givenName !== '' || familyName !== '') ? Search_Patients_Url : All_Patients_Url;
    const querystring = (givenName !== '' || familyName !== '') ? `/${givenName}/${familyName}` : '';

    return this._http.get(environment.baseUrl + base_url + querystring);
  }

  PerformPatientsearch(firstName: string, lastName: string, email: string, dob: string, telecom: string, gender: string) {

    if(gender === 'Choose...'){
      gender = '';
    }
    // const querystring = "{"+firstName+"}"+"{"+lastName+"}"+"{"+dob+"}"+"{"+telecom+"}"+"{"+email+"}";
    if (dob == null)
      this.tempDobVal = "";
    else
      this.tempDobVal = dob

    const querystring = "/{" + firstName + "}" + "/{" + lastName + "}" + "/{" + this.tempDobVal + "}" + "/{" + telecom + "}" + "/{" + email + "}"+ "/{" + gender + "}";

    //alert(querystring);
    return this._http.get(environment.baseUrl + PatientSearch_Url + querystring);
  }

  public setPatientInfo(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  public setPatientSearchInfo(key: string, val: any) {
    this.sharedService.setLocalItem(key, val);
  }

  public getPatientSearchInfo(key: string) {
    return this.sharedService.getLocalItem(key);
  }
}
