import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Alert, Allergies, Immunizations, Socials, Families } from './patient-others-model';
import { SharedService } from 'src/app/core/shared.service';
import { PatientCreateService } from '../services/patient-create.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-patient-others',
  templateUrl: './patient-others.component.html',
  styleUrls: ['./patient-others.component.css']
})
export class PatientOthersComponent implements OnInit {

  allergyArray: Array<Allergies> = [];
  immunizationArray: Array<Immunizations> = [];
  socailArray: Array<Socials> = [];
  familyArray: Array<Families> = [];
  alertArray: Array<Alert> = [];
  alertKeywordArray = [];
  patientId = '0';
  alertDesc: '';
  alertId: '';
  patientimage: any = '../../assets/PatientImages/noimage.png';
  ClsAllergyImmunization = {
    patientId: '0',
    allergies: [],
    immunizations: [],
    socials: [],
    alert: {},
    families: [],

  };
  patientFormGroup = new FormGroup({
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl('')
  });

  allergiesFormGroup = new FormGroup({
    allergiesDescription: new FormControl(''),
    allergiesCode: new FormControl(''),
  });

  alertFormGroup = new FormGroup({
    alertDescription: new FormControl(''),
    alertCode: new FormControl(''),
  });

  immunizationsFormGroup = new FormGroup({
    immunizationsDate: new FormControl(''),
    immunizationsCode: new FormControl(''),
    immunizationsDescription: new FormControl(''),
  });

  socialFormGroup = new FormGroup({
    socialAddiection: new FormControl(''),
    socialFrequency: new FormControl(''),
    socialDuration: new FormControl('')
  });
  familyFormGroup = new FormGroup({
    familyMember: new FormControl(''),
    familyDiseases: new FormControl('')
  });
  constructor(private patientCreateService: PatientCreateService,
              private router: Router, private sharedService: SharedService
    ,         public toastr: ToastrManager) { }

  ngOnInit() {
    const patientDetail = this.sharedService.getLocalItem('patientDetail');
    if (patientDetail !== null) {
      this.patientId = patientDetail.PatientId;
      this.patientimage = patientDetail.ImagePath;
      this.patientFormGroup.patchValue({
        firstName: patientDetail.FirstName,
        middleName: patientDetail.MiddleName,
        lastName: patientDetail.LastName,
        dob: patientDetail.DOB,
        gender: patientDetail.Gender,

      });

      this.patientCreateService.getImmunizations(this.patientId)
        .subscribe((res) => {
          res.forEach(element => {
            this.immunizationArray.push(
              {
                code: element.code,
                // date: element.date.substring(3, 5) + '-' + element.date.substring(0, 2) + '-' + element.date.substring(6, 10),
                date: element.date.split('/')[0] + '-' + element.date.split('/')[1] + '-' + element.date.split('/')[2].substring(0, 4),
                description: element.description,
                patientId: element.patientId,
                id: element.id
              });
          });
          // console.log(this.immunizationArray);
        },
          err => {
            console.log(err);
          });

      this.patientCreateService.getAllergies(this.patientId)
        .subscribe((res) => {
          res.forEach(element => {
            this.allergyArray.push(
              {
                code: element.code,
                description: element.description,
                patientId: element.patientId,
                id: element.id
              });
          });
          //  console.log(this.allergyArray);
        },
          err => {
            console.log(err);
          });

      this.patientCreateService.getSocials(this.patientId)
        .subscribe((res) => {
          res.forEach(element => {
            this.socailArray.push(
              {
                addiection: element.addiection,
                frequency: element.frequency,
                duration: element.duration,
                patientId: element.patientId,
                id: element.id
              });
          });
          //  console.log(this.allergyArray);
        },
          err => {
            console.log(err);
          });

      this.patientCreateService.getFamilies(this.patientId)
        .subscribe((res) => {
          res.forEach(element => {
            this.familyArray.push(
              {
                member: element.member,
                diseases: element.diseases,
                patientId: element.patientId,
                id: element.id
              });
          });
          //  console.log(this.allergyArray);
        },
          err => {
            console.log(err);
          });

      this.patientCreateService.getPatientAlert(this.patientId)
          .subscribe((res) => {
            res.forEach(element => {
              this.alertArray.push(
                {
                  id: element.id,
                  code: element.code,
                  patientId: element.patientId,
                  description: element.description
                });
              this.alertDesc = element.description ;
              this.alertId = element.code;
            });
            //  console.log(this.allergyArray);
          },
            err => {
              console.log(err);
            });

    }
    this.getMasterData('8');
  }
  finish() {
    this.ClsAllergyImmunization.patientId = this.patientId;
    this.ClsAllergyImmunization.immunizations = this.getImmunizations();
    this.ClsAllergyImmunization.allergies = this.getAllergies();
    this.ClsAllergyImmunization.socials = this.getSocial();
    this.ClsAllergyImmunization.families = this.getFamily();
    this.ClsAllergyImmunization.alert = this.getAlert();
    if (this.ClsAllergyImmunization.immunizations.length === 0) {
      this.toastr.errorToastr('Add Immunizations', 'Oops!');
      return;
    }
    if (this.ClsAllergyImmunization.allergies.length === 0) {
      this.toastr.errorToastr('Add Allergies', 'Oops!');
      return;
    }
    if (this.ClsAllergyImmunization.socials.length === 0) {
      this.toastr.errorToastr('Add Social', 'Oops!');
      return;
    }
    if (this.ClsAllergyImmunization.families.length === 0) {
      this.toastr.errorToastr('Add Family', 'Oops!');
      return;
    }

    this.patientCreateService.patientOtherService(this.ClsAllergyImmunization)
      .subscribe
      (
        res => {
          this.sharedService.removeLocalStorage('patientDetail');
          if (this.sharedService.getLocalItem('patientMode') === 'edit-patient') {
            this.router.navigate(['/patient-search'], { queryParams: { mode: 'edit-patient' } });
          } else {
            this.router.navigate(['/flowsheet-book-appointment'], { queryParams: { id: this.sharedService.getLocalItem('patientMode') } });
          }

        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          console.log(err);
        }
      );
  }
  getAllergies() {
    return this.allergyArray;
  }
  getImmunizations() {
    return this.immunizationArray;
  }
  getAlert() {
    const alert: Alert = {
      id: '0',
      patientId: this.patientId,
      code: this.alertFormGroup.value['alertCode'],
      description: this.alertFormGroup.value['alertDescription']
    };
    return alert;
  }

  getSocial() {
    return this.socailArray;
  }
  getFamily() {
    return this.familyArray;

  }
  addAllergies() {
    const alergy: Allergies = {
      id: '0',
      patientId: this.patientId,
      code: this.allergiesFormGroup.value['allergiesCode'],
      description: this.allergiesFormGroup.value['allergiesDescription']
    };
    this.allergyArray.push(alergy);
    this.allergiesFormGroup.reset();
  }
  deleteRow(index) {
    this.allergyArray.splice(index, 1);
  }

  addSocials() {
    const social: Socials = {
      id: '0',
      patientId: this.patientId,
      addiection: this.socialFormGroup.value['socialAddiection'],
      frequency: this.socialFormGroup.value['socialFrequency'],
      duration: this.socialFormGroup.value['socialDuration']
    };

    this.socailArray.push(social);
    this.socialFormGroup.reset();
  }
  deleteSocailRow(index) {
    this.socailArray.splice(index, 1);
  }
  addfamilys() {
    const family: Families = {
      id: '0',
      patientId: this.patientId,
      member: this.familyFormGroup.value['familyMember'],
      diseases: this.familyFormGroup.value['familyDiseases']
    };
    this.familyArray.push(family);
    this.familyFormGroup.reset();
  }
  deleteFamilyRow(index) {
    this.familyArray.splice(index, 1);
  }


  getMasterData(key) {
    this.patientCreateService.getMasterData(key)
      .subscribe
      (
        res => { this.alertKeywordArray = res; },
        err => { console.log(err); }
      );
  }
  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container.store.dispatch(container.actions.select(event.date));
    };
    container.setViewMode('year');
  }
  addImmunizations() {
    const immunization: Immunizations = {
      id: '0',
      patientId: this.patientId,
      // tslint:disable-next-line: max-line-length
      date: this.immunizationsFormGroup.value['immunizationsDate'].substring(5, 7) + '-' + this.immunizationsFormGroup.value['immunizationsDate'].substring(8, 10) +
        '-' + this.immunizationsFormGroup.value['immunizationsDate'].substring(0, 4),
      code: this.immunizationsFormGroup.value['immunizationsCode'],
      description: this.immunizationsFormGroup.value['immunizationsDescription']
    };
    this.immunizationArray.push(immunization);
    this.immunizationsFormGroup.reset();

  }
  deleteImmunizationRow(index) {
    this.immunizationArray.splice(index, 1);
  }
  cancel() {
    if (this.sharedService.getLocalItem('patientMode') === 'edit-patient') {
      this.router.navigate(['/patient-search'], { queryParams: { mode: 'edit-patient' } });
    } else {
      this.router.navigate(['/flowsheet-book-appointment'], { queryParams: { id: this.sharedService.getLocalItem('patientMode') } });
    }
  }
}
