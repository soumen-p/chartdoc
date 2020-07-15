import { Component, OnInit } from '@angular/core';
import { PatientAllergiesService } from '../../services/patient-allergies.service';
import { Allergies } from '../../models/patient-allergies.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-patient-allergies',
  templateUrl: './patient-allergies.component.html',
  styleUrls: ['./patient-allergies.component.css']
})
export class PatientAllergiesComponent implements OnInit {
  patientInfo: any;
  public allergieRreaction: string;
  public allergiesList: any;
  allergy: Allergies[] = [];
  allergyCode: string;
  allergyDisplay: string;
  isRecordFound: boolean;
  public allergyDesc: string;
  entry: any;
  resource: any;
  patientId: string;
  flag: string;
  constructor(private allergies: PatientAllergiesService) { }
  ngOnInit() {
    this.patientInfo = this.allergies.getPatientDetails('patientInfo');
    this.flag = this.patientInfo.flag;
    this.patientId = this.patientInfo.patientId;
    if (isNullOrUndefined(this.allergies.getAllergiesInfo('allergies' + this.patientId))) {
      this.allergies.getAllergies(this.patientId, this.flag)
        .subscribe((res) => {
          if (this.flag === 'E') {
            this.allergiesList = res.entry;
            this.allergiesList = res.entry;
            if (this.allergiesList.length > 0) {
              this.isRecordFound = true;
              this.allergiesList.forEach(allergyTollerance => {
                allergyTollerance.resource.reaction.forEach(reaction => {
                  reaction.manifestation.forEach(element => {
                    this.allergy.push({ allergiesDesc: element.text });
                  });
                });
              });
            }
          } else {
            this.allergiesList = res;
            this.allergiesList.forEach(element => {
              this.allergy.push({ allergiesDesc: element.description });
            });
          }
          this.allergies.setAllergiesInfo('allergies' + this.patientId, this.allergy);
        });
    } else {
      this.allergiesList = this.allergies.getAllergiesInfo('allergies' + this.patientId);
      this.allergiesList.forEach(element => {
        this.allergy.push({ allergiesDesc: element.allergiesDesc });
      });
    }
  }
}

