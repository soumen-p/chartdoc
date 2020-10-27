import { Component, OnInit } from '@angular/core';
import { PatientImmunizationService } from '../../services/patient-immunizations.service';
import { Immunization } from '../../models/patient-immunizations.model';

@Component({
  selector: 'app-patient-immunizations',
  templateUrl: './patient-immunizations.component.html',
  styleUrls: ['./patient-immunizations.component.css']
})
export class PatientImmunizationsComponent implements OnInit {

  immunizations: any;
  immunizationsArray: Immunization[] = [];

  public immunizationsList: any;
  isRecordFound: boolean;
  patientId: string;
  flag: string;

  constructor(private immunizationService: PatientImmunizationService) { }

  ngOnInit() {
    this.flag = this.immunizationService.getPatientDetails('patientInfo').flag;
    this.patientId = this.immunizationService.getPatientDetails('patientInfo').patientId;
    this.immunizationService.getImmunizations(this.patientId, this.flag)
      .subscribe((res) => {
        
        if (this.flag === 'E') {
          this.immunizationsList = res.entry;
          if (this.immunizationsList.length > 0) {
            this.isRecordFound = true;
            this.immunizationsList.forEach(immunization => {
              this.immunizationsArray.push({
                immunizationsDate: immunization.resource.date.substring(6,10),
                immunizationsDesc: immunization.resource.vaccineCode.text
              });
            });
          }
        } else {
          this.immunizationsList = res;
          this.immunizationsList.forEach(element => {
            this.immunizationsArray.push({
              immunizationsDate: element.date.substring(6,10),
              immunizationsDesc: element.description
            });
          });
        }
      },
        err => {
          
        });
  }


}
