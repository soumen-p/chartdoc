import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Prescriptions } from '../models/prescriptionsModel';
import { SharedService } from '../core/shared.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const BaseUrl = 'http://localhost:14403/api/ChartDoc/GetICD';
const medicineBaseUrl = 'api/ChartDoc/GetMedicine';
@Injectable({
  providedIn: 'root'
})
export class PatientPrescriptionsservice {
  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }
  prescription: Prescriptions[] = [
    {
      Drugid: 1,
      Drugcode: '17129 M1712',
      DrugName:  'Diovan 10mg',
      Drugdesc: 'Diovan 10mg',
      ManufacturerName: 'Sandip',
      PrescribedDate: '01/01 /2019',
      PrescriptionProvidedBy: 'Sandip'
    },
    {
      Drugid: 2,
      Drugcode: '17129 M1712',
      DrugName:  'Diovan 10mg',
      Drugdesc: 'Diovan 10mg',
      ManufacturerName: 'Sandip',
      PrescribedDate: '01/01 /2019',
      PrescriptionProvidedBy: 'Sudip'
    },
    {
      Drugid: 3,
      Drugcode: '17129 M1712',
      DrugName:  'Diovan 10mg',
      Drugdesc: 'Diovan 10mg',
      ManufacturerName: 'Sandip',
      PrescribedDate: '01/01 /2019',
      PrescriptionProvidedBy: 'Vinod'
    },
    {
      Drugid: 4,
      Drugcode: '17129 M1712',
      DrugName:  'Norvasc 10mg',
      Drugdesc: 'Norvasc 10mg',
      ManufacturerName: 'Sandip',
      PrescribedDate: '01/01 /2019',
      PrescriptionProvidedBy: 'Arvind'
    },
    {
      Drugid: 5,
      Drugcode: '17129 M1712',
      DrugName:  'Norvasc 10mg',
      Drugdesc: 'Norvasc 10mg',
      ManufacturerName: 'Sandip',
      PrescribedDate: '01/01 /2019',
      PrescriptionProvidedBy: 'Sudip Designner'
    },
  ];


  getPatientPrescriptionDetails(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + BaseUrl);
  }
  public getPatientGetMedicine(patientId: string): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'text/plain');
    patientId = btoa(patientId);
    return this.httpClient.get(environment.baseUrl + medicineBaseUrl + `/${patientId}`, {headers: myHeaders});
  }
  getPatientPrescriptionDetailsTest(): any {
    return this.prescription;
  }
  getPatientDetails(patientInfo: string) {
    return this.sharedService.getLocalItem(patientInfo);
  }
}
