import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientProfileHeaderService } from '../../services/patient-profile-header.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-profile-header',
  templateUrl: './patient-profile-header.component.html',
  styleUrls: ['./patient-profile-header.component.css']
})
export class PatientProfileHeaderComponent implements OnInit {
  patientInfo: any;
  doctorInfo: any;
  isModalRespValid = false;
  isModalWeightValid = false;
  isModalHeightValid = false;
  isModalPulseValid = false;
  isModalBPValid = false;
  isModalTempValid = false;
  isPosCheckOut = false;
  patientName: string;
  patientImage = '../../../assets/PatientImages/noimage.png';
  patientAge: string;
  patientGender: string;
  bpFirst: string;
  bpLast: string;
  pulse: string;
  height1: string;
  height2: string;
  weight: string;
  temprature: string;
  respiratory: string;
  message: string;
  modelBpFirst: string;
  modelBpLast: string;
  modelPulse: string;
  modelHeight1: string;
  modelHeight2: string;
  modelWeight: string;
  modelTemprature: string;
  modelRespiratory: string;
  public windowTop = 150;
  public windowLeft = 10;
  closeResult: string;
  isView: boolean;
  doctorName: string;
  doctorImg: string;
  isDoctor: boolean;
  commonSubscription: Subscription;
  apiSubscription: Subscription;
  patientId: string;
  flag: string;
  observationEntry: any;
  formObservation: FormGroup;

  constructor(private profileHeaderService: PatientProfileHeaderService, private router: Router) {
  }
  ngOnInit() {
    this.formObservation = new FormGroup({
      patientId: new FormControl(''),
      pBloodPressureL: new FormControl(''),
      pBloodPressureR: new FormControl(''),
      pPulse: new FormControl(''),
      pHeightL: new FormControl(''),
      pHeightR: new FormControl(''),
      pWeight: new FormControl(''),
      pTemperature: new FormControl(''),
      pRespiratory: new FormControl('')
    });

    const doctorBookingInfo = this.profileHeaderService.getBookingInfo('doctorBookingInfo');
    // tslint:disable-next-line: triple-equals
    if (doctorBookingInfo != null && doctorBookingInfo.positionID != 'undefined' && doctorBookingInfo.positionID == '-3') {
       this.isPosCheckOut = true;
    }

    this.patientInfo = this.profileHeaderService.getPatientDetails('patientInfo');
    this.doctorInfo = this.profileHeaderService.getDoctorDetails('doctorInfo');
    this.doctorName = this.doctorInfo.doctorName;
    this.doctorImg = this.doctorInfo.doctorImage;

    // tslint:disable-next-line: triple-equals
    if (this.doctorInfo.userType == '1') {
      this.isDoctor = true;
    } else {
      this.isDoctor = false;
    }

    this.patientId = this.patientInfo.appointmentId;
    this.flag = this.patientInfo.flag;
    this.patientName = this.patientInfo.patientFullName;
    // tslint:disable-next-line: triple-equals
    if (this.patientInfo.patientImagePath != '') {
      this.patientImage = this.patientInfo.patientImagePath;
    }
    this.patientAge = this.patientInfo.patientAge;
    this.patientGender = this.patientInfo.patientGender;

    // tslint:disable-next-line: variable-name
    const _this = this;
    this.apiSubscription = this.profileHeaderService.GetPatientObservations(this.patientId, this.flag)
      .subscribe((res) => {
        _this.observationEntry = res;
        if(res.length>0){
        _this.modelBpFirst = _this.bpFirst = res[0].pBloodPressureL;
        _this.modelBpLast = _this.bpLast = res[0].pBloodPressureR;
        _this.modelPulse = _this.pulse = res[0].pPulse;
        _this.modelHeight1 = _this.height1 = res[0].pHeightL;
        _this.modelHeight2 = _this.height2 = res[0].pHeightR;
        _this.modelWeight = _this.weight = res[0].pWeight;
        _this.modelTemprature = _this.temprature = res[0].pTemperature;
        _this.modelRespiratory = _this.respiratory = res[0].pRespiratory;
        }
      },
        err => {
          console.log(err);
        });
  }

  viewDetails() {
    this.isView = true;
  }

  goToCheckOut() {
    this.router.navigateByUrl('/patient-flow-sheet');
  }
  // --BP Section --//
  public closeBp(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
    this.modelBpFirst = this.bpFirst;
    this.modelBpLast = this.bpLast;
  }

  public openBp(myModal: string) {
    document.getElementById(myModal).style.display = 'block';
  }
  public submitBp(BP1: string, BP2: string) {
    this.bpFirst = BP1;
    this.bpLast = BP2;
    this.profileHeaderService.setBloodPressure('BP', this.bpFirst + '/' + this.bpLast);
    this.closeBp('modalBP');
  }
  // --BP Section --//

  // --Pulse Section --//
  public closePulse(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
    this.modelPulse = this.pulse;
  }

  public openPulse(myModal: string) {
    document.getElementById(myModal).style.display = 'block';
    this.validatePulse(this.pulse);
  }

  public submitPulse(Pulse: string) {
    this.pulse = Pulse;
    this.profileHeaderService.setPulse('pulse', this.pulse);
    this.closePulse('modalPulse');
  }
  // --Pulse Section --//

  // --Height Section --//
  public closeHeight(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
    this.modelHeight1 = this.height1;
    this.modelHeight2 = this.height2;
  }

  public openHeight(myModal: string) {
    document.getElementById(myModal).style.display = 'block';
    // this.validateHeight(this.Height1,this.Height2);
  }

  public submitHeight(height1: string, height2: string) {
    this.height1 = height1;
    this.height2 = height2;

    this.profileHeaderService.setHeight('height', `${this.height1}'${this.height2}"`);
    this.closeHeight('modalHeight');
  }
  // --Height Section --//

  // --Weight Section --//
  public closeWeight(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
    this.modelWeight = this.weight;
  }

  public openWeight(myModal: string) {
    this.weight = this.weight;
    document.getElementById(myModal).style.display = 'block';
    this.validateWeight(this.weight);
  }

  public submitWeight(weight: string) {
    this.weight = weight;
    this.profileHeaderService.setWeight('weight', this.weight);
    this.closeWeight('modalWeight');
  }
  // --Weight Section --//

  // --Temprature Section --//
  public closeTemp(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
    this.modelTemprature = this.temprature;
  }

  public openTemp(myModal: string) {
    document.getElementById(myModal).style.display = 'block';
    this.validateTemp(this.temprature);
  }

  public submitTemp(temp: string) {
    this.temprature = temp;
    this.profileHeaderService.setTemperature('temperature', this.temprature);
    this.closeTemp('modalTemp');
  }
  // --Temprature Section --//

  // --Respiratory Section --//
  public closeResp(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
    this.modelRespiratory = this.respiratory;
  }

  public openResp(myModal: string) {
    document.getElementById(myModal).style.display = 'block';
    this.validateResp(this.respiratory);
  }

  public submitResp(resp: string) {
    this.respiratory = resp;
    this.profileHeaderService.setRespiratory('respiratory', this.respiratory);
    this.closeResp('modalResp');
  }

  // --Respiratory Section --//

  public exit() {
    this.isView = false;
  }

  public saveObservation() {
    this.formObservation.setValue({
      patientId: this.patientId,
      pBloodPressureL: this.bpFirst,
      pBloodPressureR: this.bpLast,
      pPulse: this.pulse,
      pHeightL: this.height1,
      pHeightR: this.height2,
      pWeight: this.weight,
      pTemperature: this.temprature,
      pRespiratory: this.respiratory
    });

    this.profileHeaderService.saveObservation(this.formObservation.value).subscribe
      (
        data => {
          if (data > 0) {
            this.message = 'Operation Successful';
            this.router.navigateByUrl('/patient-flow-sheet');
          } else {
            this.message = 'Operation Unsuccessful';
          }
        }
      );
  }

  heightNumberOnly(event, Height: string): boolean {
    // tslint:disable-next-line: triple-equals
    if (Height == 'H1') {
      this.height1 = event.target.value;
    // tslint:disable-next-line: triple-equals
    }    else if (Height == 'H2') {
      // this.Height2 = event.target.value;
 }

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // Numeric Validation
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  tempNumberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    // alert(charCode);
    if (charCode === 46) {
      return true;
    }    else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }
  ValidateHeight(event) {

    if (Number(event.target.value) > 12) {
      //  alert('value must be between 0 to 12');
      // this.Height2 = '';
      this.modelHeight2 = this.height2;
      event.target.value = this.height2;
      this.validateHeight2(event.target.value);
    }    else {
      this.validateHeight2(event.target.value);
      return true;
    }
  }

  validateBp(BP: string) {
    // tslint:disable-next-line: triple-equals
    if ((BP != '' && Number(BP) >= 0)) {
      this.isModalBPValid = true;
    }    else {
      this.isModalBPValid = false;
    }
  }

  validateHeight(height1: string) {
    // tslint:disable-next-line: triple-equals
    if (height1 == 'undefined') {
      height1 = this.height1;
    }

    // tslint:disable-next-line: triple-equals
    if (height1 != '' && Number(height1) >= 0) {
      this.isModalHeightValid = true;
    }    else {
      this.isModalHeightValid = false;
    }
  }
  validateHeight2(height2: string) {
    // tslint:disable-next-line: triple-equals
    if (height2 == 'undefined') {
      height2 = this.modelHeight2;
    }

    // tslint:disable-next-line: triple-equals
    if (height2 != '' && Number(height2) >= 0) {
      this.isModalHeightValid = true;
    }    else {
      this.isModalHeightValid = false;
    }
  }
  validateWeight(weight: string) {
    // tslint:disable-next-line: triple-equals
    if (weight != '' && Number(weight) >= 0) {
      this.isModalWeightValid = true;
    }    else {
      this.isModalWeightValid = false;
    }
  }

  validatePulse(Pulse: string) {
    // tslint:disable-next-line: triple-equals
    if (Pulse != '' && Number(Pulse) >= 0) {
      this.isModalPulseValid = true;
    }    else {
      this.isModalPulseValid = false;
    }
  }
  validateResp(Resp: string) {
    // tslint:disable-next-line: triple-equals
    if (Resp != '' && Number(Resp) >= 0) {
      this.isModalRespValid = true;
    }    else {
      this.isModalRespValid = false;
    }
  }
  validateTemp(Temp: string) {
    // tslint:disable-next-line: triple-equals
    if (Temp != '' && Number(Temp) >= 0) {
      this.isModalTempValid = true;
    }    else {
      this.isModalTempValid = false;
    }
  }
}
