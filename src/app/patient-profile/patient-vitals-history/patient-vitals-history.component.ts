import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { PatientdiagnosisService } from '../../services/patientdiagnosis.service';
import { PatientDiagnosis } from 'src/app/models/patient-diagnosis';
import { Document } from 'src/app/models/document.model';
import { isNullOrUndefined } from 'util';
import { CommonService } from 'src/app/core/common.service';
import { PatientSocialFamilyService } from '../../services/patient-social-family.service';
@Component({
  selector: 'app-patient-vitals-history',
  templateUrl: './patient-vitals-history.component.html',
  styleUrls: ['./patient-vitals-history.component.css']
})
export class PatientVitalsHistoryComponent implements OnInit {
  @Input() patienthisttory : boolean =true ;
  vitalHistory: any[] = [];
  flag: any;
  patientId: any;
  pageOfItems: Array<any>;
  constructor(private patientSocialFamilyService: PatientSocialFamilyService,  private commonService: CommonService) { 

  }

  ngOnInit() {
    this.flag = this.patientSocialFamilyService.getPatientDetails('patientInfo').flag;
    this.patientId = this.patientSocialFamilyService.getPatientDetails('patientInfo').patientId;
    this.patientSocialFamilyService.getVitalsHistory(this.patientId, this.flag)
      .subscribe((res) => {
        this.vitalHistory= res;
        //this.patientSocialss = res;
       // console.log(this.patientSocialss);
      },
        err => {
          console.log(err);
        });
    
  }

}
