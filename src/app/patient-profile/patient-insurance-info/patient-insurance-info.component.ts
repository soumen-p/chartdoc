import { Component, OnInit } from '@angular/core';
import { PatientInsuranceinfoService } from '../../services/patient-insuranceinfo.service';
import { Insuranceinfo } from '../../models/patient-insuranceinfo.model';
@Component({
  selector: 'app-patient-insurance-info',
  templateUrl: './patient-insurance-info.component.html',
  styleUrls: ['./patient-insurance-info.component.css']
})
export class PatientInsuranceInfoComponent implements OnInit {
  public insuranceinfosList: any;
  isRecordFound: boolean;
  patientId: string;
  flag: string;
  pageOfItems: Array<any>;
  constructor(private patientInsuranceInfoService: PatientInsuranceinfoService) { }
  ngOnInit() {
    this.flag = this.patientInsuranceInfoService.getPatientDetails('patientInfo').flag;
    this.patientId = this.patientInsuranceInfoService.getPatientDetails('patientInfo').patientId;
    this.patientInsuranceInfoService.getInsuranceInfo(this.patientId, this.flag)
      .subscribe((res) => {
        this.insuranceinfosList = res;
      },
        err => {
          console.log(err);
        });
      }
      onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
      }
    }
    