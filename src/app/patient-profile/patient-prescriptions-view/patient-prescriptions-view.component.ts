import { Component, OnInit } from '@angular/core';
import {PatientPrescriptionsservice  } from '../../services/patient-Prescriptions.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-patient-prescriptions-view',
  templateUrl: './patient-prescriptions-view.component.html',
  styleUrls: ['./patient-prescriptions-view.component.css']
})
export class PatientPrescriptionsViewComponent implements OnInit {
  patientInfo: any;
  patientId: string;
  prescriptionData: any;
  constructor(private prescriptionsService: PatientPrescriptionsservice) { }

  ngOnInit() {
    this.patientInfo = this.prescriptionsService.getPatientDetails('patientInfo');
    this.patientId = this.patientInfo.patientId;
    this.prescriptionsService.getPatientGetMedicine(this.patientId)
      .subscribe((res) => {
        this.prescriptionData = res;
      },
      err => {
      
      });

  }

}
