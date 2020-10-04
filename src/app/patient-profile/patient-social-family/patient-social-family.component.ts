import { Component, OnInit } from '@angular/core';
import { PatientSocialFamilyService } from '../../services/patient-social-family.service';
import { PatientSocialModel } from '../../models/patient-social.model';
import { PatientFamilyModel } from '../../models/patient-family.model';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-patient-social-family',
  templateUrl: './patient-social-family.component.html',
  styleUrls: ['./patient-social-family.component.css']
})
export class PatientSocialFamilyComponent implements OnInit {

  patientSocialss: PatientSocialModel[] = [];
  patientFamilyss: PatientFamilyModel[] = [];
  flag: any;
  patientId: any;
  pageOfItems: Array<any>;
  pageOfItemsfamily: Array<any>;
  patientSocials: PatientSocialModel[] = [
    {
      addiection: 'Tobacco',
      frequency: '1 pack/day',
      duration: '8 years'
    },
    {
      addiection: 'Alcohol',
      frequency: '6 per week',
      duration: '4 years'
    },
    {
      addiection: 'Alcohol Test',
      frequency: '6 per week Test',
      duration: '4 years Test'
    }
  ];
  patientFamilys: PatientFamilyModel[] = [
    {
      Member: 'Father',
      Diseases: 'Prostate Cancer'
    },
    {
      Member: 'Father',
      Diseases: 'Hypertension'
    },
    {
      Member: 'Father Mother Test',
      Diseases: 'Hypertension Test'
    }
  ];
  constructor(private patientSocialFamilyService: PatientSocialFamilyService,
              private commonService: CommonService) { }
  ngOnInit() {
    this.flag = this.patientSocialFamilyService.getPatientDetails('patientInfo').flag;
    this.patientId = this.patientSocialFamilyService.getPatientDetails('patientInfo').patientId;
    this.patientSocialFamilyService.getSocialDetails(this.patientId, this.flag)
      .subscribe((res) => {
        this.patientSocialss = res;
        console.log(this.patientSocialss);
      },
        err => {
          console.log(err);
        });
    this.patientSocialFamilyService.getFamilyDetails(this.patientId, this.flag)
      .subscribe((res) => {
        if (this.flag === 'E') {
          this.patientFamilyss = this.patientFamilys;
        } else {
          this.patientFamilyss = res;
          console.log(this.patientFamilyss);
        }
      },
        err => {
          console.log(err);
        });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  onChangePagefamily(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItemsfamily = pageOfItems;
  }
}
