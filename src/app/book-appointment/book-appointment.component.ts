import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookAppointmentService } from '../services/book-appointment.service';
import { Appointment } from './book-appointment-model';
import { SharedService } from '../core/shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';

import { AppointmentService } from '../services/appointment.service';
import { PatientSearchService } from '../services/patient-search.service';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  files: File[] = [];
  public width = 400;
  formData: FormData;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  @ViewChild('file', { static: true }) myInputVariable: ElementRef;
  @ViewChild('bookAppointmentForm', { static: true }) bookAppointmentForm;
  myDateValue: Date;
  doctorId = '';
  patientId = '';
  appointmentId = 0;
  fileUrl = '';
  isEdit = false;
  selectedServiceId = -1;
  services = [];
  positionId = 0;
  positionName = '';
  patientInfo: any;
  encounterList: any;
  patientDetails = {
    patientId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    dOB: '',
    gender: '',
    address: ''
  };
  reasons = [];
  appointmentReasons = [];
  blnsave = false;
  blnfinsh = false;
  strcancel = 'Cancel';
  minDate = undefined;
  isReschdule = true;
  isFlowsheetDisable = true;
  isPositionDisable = false;
  bookAppointmentFormGroup = new FormGroup({
    // firstName: new FormControl('', [Validators.required]),
    patientId: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    address: new FormControl('')
  });

  appointmentFormGroup = new FormGroup({
    date: new FormControl(''),
    fromTime: new FormControl(''),
    toTime: new FormControl(''),
    provider: new FormControl(''),
    service: new FormControl(''),
    position: new FormControl('0'),
    reasonID: new FormControl('0', [Validators.required]),
    reasonCode: new FormControl('0'),
    reasonDescription: new FormControl(''),
    note: new FormControl('')
  });
  isflowsheet: any = 0;
  constructor(private bookAppointmentService: BookAppointmentService, private patientSearchService: PatientSearchService,
              private avRoute: ActivatedRoute,
              private appointmentService: AppointmentService, private router: Router,
              public toastr: ToastrManager
  ) {
    this.formData = new FormData();
    const current = new Date();
    this.minDate = current;

    if (this.avRoute.snapshot.queryParams['id'] != undefined) {
      this.isflowsheet = Number(this.avRoute.snapshot.queryParams['id']);
      this.isFlowsheetDisable = true;
      this.strcancel = 'Back';
      this.blnfinsh = true;
    }
    const doctorBookingInfo = this.appointmentService.getBookingInfo('doctorBookingInfo');
    if (doctorBookingInfo != null && doctorBookingInfo != undefined && Number(this.isflowsheet) > 1) {
      this.getEncounterDetails(doctorBookingInfo.patientId, doctorBookingInfo.appointmentid);
    }
    console.log(doctorBookingInfo);
    const name = doctorBookingInfo.patientname.split(' ');
    this.doctorId = doctorBookingInfo.doctorid;
    this.patientId = doctorBookingInfo.patientId;
    this.appointmentId = doctorBookingInfo.appointmentid;
    if (this.isflowsheet === 0 && name != '') {
      this.isFlowsheetDisable = false;
    }
    if (this.appointmentId != 0) {
      this.isEdit = true;
      this.fileUrl = doctorBookingInfo.imageUrl;
    }
    if (doctorBookingInfo.dateOfBirth != '') {
      const patientDob = new Date(doctorBookingInfo.dateOfBirth);
      patientDob.setMinutes(patientDob.getMinutes() + patientDob.getTimezoneOffset());
      patientDob.setDate(patientDob.getDate() + 1);
      this.bookAppointmentFormGroup.patchValue({
        dateOfBirth: patientDob,
        // doctorBookingInfo.dateOfBirth,
      });
    }
    // if(doctorBookingInfo.appointmentid!="0"){
    this.bookAppointmentFormGroup.patchValue({
      firstName: name[0],
      middleName: name[1],
      lastName: name[2],
      patientId: doctorBookingInfo.patientId,
      phone: doctorBookingInfo.phone,
      email: doctorBookingInfo.email,
      gender: doctorBookingInfo.gender,
      address: doctorBookingInfo.address,
    });
    if (doctorBookingInfo.appointmentid != '0') {
      this.blnsave = true;
      this.bookAppointmentService.setCopayAppId('CopayAppId', this.appointmentId);
    }

    // if(doctorBookingInfo.patientId!="0"){
    this.bookAppointmentFormGroup.controls['firstName']!.disable();
    this.bookAppointmentFormGroup.controls['lastName']!.disable();
    this.bookAppointmentFormGroup.controls['middleName']!.disable();
    this.bookAppointmentFormGroup.controls['phone']!.disable();
    this.bookAppointmentFormGroup.controls['email']!.disable();
    this.bookAppointmentFormGroup.controls['dateOfBirth']!.disable();
    this.bookAppointmentFormGroup.controls['address']!.disable();

    const appointmentDate = new Date(doctorBookingInfo.startdate);
    appointmentDate.setMinutes(appointmentDate.getMinutes() + appointmentDate.getTimezoneOffset());
    appointmentDate.setDate(appointmentDate.getDate() + 1);

    this.appointmentFormGroup.patchValue({
      provider: doctorBookingInfo.doctorname,
      date: appointmentDate, // mm+"/"+dd+"/"+yyyy,
      fromTime: { hour: Number(doctorBookingInfo.starttime.split(':')[0]),
      minute: Number(doctorBookingInfo.starttime.split(':')[1]), second: 0 },
      // doctorBookingInfo.starttime,
      toTime: { hour: Number(doctorBookingInfo.endtime.split(':')[0]),
      minute: Number(doctorBookingInfo.endtime.split(':')[1]), second: 0 },
      // doctorBookingInfo.endtime,
      service: doctorBookingInfo.serviceID,
      position: doctorBookingInfo.positionID,
      reasonID: doctorBookingInfo.reasonID,
      reasonCode: doctorBookingInfo.reasonCode,
      note: doctorBookingInfo.note
    });
    if (this.appointmentFormGroup.value.position != 0) {
      this.getReason(this.appointmentFormGroup.value.position);
      if (this.appointmentFormGroup.value.position === -2) {
        this.isReschdule = false;
      }
    }

    if (doctorBookingInfo.appointmentid === '0') {
      this.appointmentFormGroup.patchValue({
        position: '-1'
      });
      // this.appointmentFormGroup.controls['position'].disable();
      this.getReason(-1);
      if (this.appointmentFormGroup.value.position === '-2') {
        this.isReschdule = false;
      } else if (this.appointmentFormGroup.value.position === '-1') {
        this.isPositionDisable = true;
      } else {
        this.isPositionDisable = false;
      }
    }

  }

  getEncounterDetails(pID: string, aID: string) {

    this.bookAppointmentService.getEncounterData(pID).subscribe((res) => {
      this.encounterList = res;
      this.patientInfo = {
        patientId: this.encounterList.patientId,
        appointmentId: aID,
        flag: this.encounterList.flag,
        patientFirstName: this.encounterList.firstName,
        patientLastName: this.encounterList.lastName,
        patientFullName: this.encounterList.firstName + ' ' + this.encounterList.lastName,
        patientImagePath: this.encounterList.imagePath,
        patientAge: this.encounterList.age,
        patientGender: this.encounterList.gender,
        rcopiaId: this.encounterList.recopiaId,
        rcopiaName: this.encounterList.recopiaName,
      };
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
    this.myDateValue = new Date();
    this.getAllServices();
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  addPatient() {
    this.patientDetails.firstName = this.bookAppointmentFormGroup.value['firstName'];
    this.patientDetails.lastName = this.bookAppointmentFormGroup.value['lastName'];
    this.patientDetails.email = this.bookAppointmentFormGroup.value['email'];
    this.patientDetails.dOB = this.bookAppointmentFormGroup.value['dateOfBirth'];
    this.patientDetails.phone = this.bookAppointmentFormGroup.value['phone'];
    this.patientDetails.address = this.bookAppointmentFormGroup.value['address'];

    this.bookAppointmentService.addPatient(this.patientDetails)
      .subscribe((res) => {
        console.log('Response:%o', res);
        this.patientId = res.PatientId;
        this.addAppointment(this.patientId);
      }, err => {
        console.log(err);
      });
  }
  addAppointment(_patientId) {
    if (!this.bookAppointmentFormGroup.valid) {
      return;
    }
    if (!this.validatePhoneno()) {
      this.toastr.errorToastr('Invalid Phone number.Phone number format must be (xxx)-xxx-xxxx', 'Oops!');
      return;
    }
    if (!this.timeValidation()) {
      return;
    }
    if (!this.validateActionReason()) {
      return;
    }
    if (this.validateImage(this.appointmentFormGroup.controls['position'].value)) {
      return;
    }
    this.bookAppointmentFormGroup.patchValue({
      dateOfBirth: String(this.bookAppointmentFormGroup.controls['dateOfBirth'].value.getMonth() + 1).padStart(2, '0') + '/' +
        String(this.bookAppointmentFormGroup.controls['dateOfBirth'].value.getDate()).padStart(2, '0') + '/' +
        this.bookAppointmentFormGroup.controls['dateOfBirth'].value.getFullYear(),
    });
    this.appointmentFormGroup.patchValue({
      date: String(this.appointmentFormGroup.value.date.getMonth() + 1).padStart(2, '0') + '/' +
        String(this.appointmentFormGroup.value.date.getDate()).padStart(2, '0') + '/' +
        this.appointmentFormGroup.value.date.getFullYear(),
      fromTime: String(this.appointmentFormGroup.value.fromTime.hour).padStart(2, '0') + ':' +
        String(this.appointmentFormGroup.value.fromTime.minute).padStart(2, '0'),
      toTime: String(this.appointmentFormGroup.value.toTime.hour).padStart(2, '0') + ':' +
        String(this.appointmentFormGroup.value.toTime.minute).padStart(2, '0')
    });

    console.log(this.appointmentFormGroup.value);
    const param: Appointment = {
      AppointmentId: this.appointmentId,
      AppointmentNo: this.getAppointmentNumber(),
      PatientId: this.patientId,
      PatientName: this.bookAppointmentFormGroup.controls['firstName'].value + ' '
      + this.bookAppointmentFormGroup.controls['lastName'].value,
      Address: this.bookAppointmentFormGroup.controls['address'].value,
      ContactNo: this.bookAppointmentFormGroup.controls['phone'].value,
      Email: this.bookAppointmentFormGroup.controls['email'].value,
      dOB: this.bookAppointmentFormGroup.controls['dateOfBirth'].value,
      Gender: this.bookAppointmentFormGroup.controls['gender'].value,
      DoctorId: this.doctorId,
      Date: this.appointmentFormGroup.controls['date'].value,
      FromTime: this.appointmentFormGroup.controls['fromTime'].value,
      ToTime: this.appointmentFormGroup.controls['toTime'].value,
      ReasonCode: this.appointmentFormGroup.controls['reasonCode'].value,
      ReasonDescription: this.appointmentFormGroup.controls['reasonDescription'].value,
      Tag: '',
      ReasonID: this.appointmentFormGroup.controls['reasonID'].value,
      Reason: '',
      IsReady: false,
      PositionID: this.appointmentFormGroup.controls['position'].value,
      PositionName: this.positionName,
      RoomNO: '',
      Flowarea: '',
      ServiceId: this.appointmentFormGroup.controls['service'].value,
      Note: this.appointmentFormGroup.controls['note'].value,
    };

    this.formData.append('appointmentDetails', JSON.stringify(param));
    this.formData.append('uploadFile', this.files[0]);
    console.log(this.formData.get('appointmentDetails'));
    console.log(this.formData.get('uploadFile'));
    this.bookAppointmentService.saveAppointment(this.formData)
      .subscribe((res) => {
        console.log('Response:%o', res);
        const reStatus = res.split('|');
        if (reStatus[0] == '1') {
          this.appointmentService.setBookingInfo('lastdate', this.appointmentFormGroup.controls['date'].value);
          this.router.navigate(['/appointment-search'], { queryParams: { id: reStatus[0] } });
        } else {
          this.toastr.errorToastr(reStatus[1] + ' , please contact system admin!', 'Error!');
        }

      }, err => {
        this.toastr.errorToastr('please contact system admin!', 'Error!');
        console.log(err);
      });
  }

  getAppointmentNumber() {
    return 'APP/' + Math.random().toString().substr(2, 5);
  }
  // event handler for the select element's change event
  selectChangeHandler(event: any) {
    this.selectedServiceId = event.target.value;
  }
  onPositionChange(event: any) {

    if (this.appointmentFormGroup.value.position != 0) {
      this.getReason(this.appointmentFormGroup.value.position);
    } else {
      this.reasons = [];
      this.appointmentFormGroup.patchValue({
        position: 0
      });
    }

    if (this.appointmentFormGroup.value.position === -2) {
      this.isReschdule = false;
    } else {
      this.isReschdule = true;
    }
  }
  searchPatient() {
    this.router.navigate(['/patient-search-appointment'], { queryParams: { id: 1 } });
  }
  finish() {
    this.addAppointment(this.patientId);
  }

  getAllServices() {
    this.bookAppointmentService.getAllServices()
      .subscribe((res) => {
        this.services = res;
        console.log('Service%o', this.services);
      }, err => {
        console.log(err);
      });
  }
  getReason(param: any) {
    this.bookAppointmentService.getReason(param)
      .subscribe((res) => {
        this.reasons = res;

      }, err => {
        console.log(err);
      });
  }
  validateImage(position: string) {
    if (position === '1' || position === '2') {
      if (this.files.length > 0) {
        return false;
      } else {
        this.toastr.errorToastr('Please upload file', 'File error');
        return true;
      }
    } else {
      return false;
    }


  }

  reset(): void {
    this.bookAppointmentForm.resetForm();
    this.isFlowsheetDisable = false;
    this.bookAppointmentFormGroup.controls['firstName']!.enable();
    this.bookAppointmentFormGroup.controls['lastName']!.enable();
    this.bookAppointmentFormGroup.controls['middleName']!.enable();
    this.bookAppointmentFormGroup.controls['phone']!.enable();
    this.bookAppointmentFormGroup.controls['email']!.enable();
    this.bookAppointmentFormGroup.controls['dateOfBirth']!.enable();
    this.patientId = '';
    this.appointmentId = 0;
    // this.bookAppointmentFormGroup.controls['gender']!.disable();
    this.bookAppointmentFormGroup.controls['address']!.enable();
    let doctorBookingInfo = this.appointmentService.getBookingInfo('doctorBookingInfo');
    this.appointmentService.setBookingInfo('doctorBookingInfo', {
      'doctorid': doctorBookingInfo.doctorid,
      'doctorname': doctorBookingInfo.doctorname, 'startdate': doctorBookingInfo.startdate,
      'enddate': doctorBookingInfo.enddate, 'starttime': doctorBookingInfo.starttime,
      'endtime': doctorBookingInfo.endtime, 'patientname': '',
      'patientId': '',
      'appointmentid': '0',
      'email': '',
      'phone': '',
      'dateOfBirth': '',
      'gender': '',
      'address': ''
    });
    // }
  }
  cancel() {
    if (this.isflowsheet != '0') {
      this.router.navigateByUrl('/patient-flow-sheet');
    } else {
      this.router.navigateByUrl('/appointment');
    }
  }
  upload(fileList: any[]) {
  }
  timeValidation(): boolean {
    if (this.appointmentFormGroup.value.toTime.hour === 18 && this.appointmentFormGroup.value.toTime.minute >= 1) {
      this.toastr.errorToastr('Invalid To Time', 'Oops!');
      return false;
    }
    if (this.appointmentFormGroup.value.fromTime.hour < 8 || this.appointmentFormGroup.value.fromTime.hour > 18) {
      this.toastr.errorToastr('Invalid From Time', 'Oops!');
      return false;
    }
    if (this.appointmentFormGroup.value.toTime.hour < 8 || this.appointmentFormGroup.value.toTime.hour >= 18) {
      this.toastr.errorToastr('Invalid To Time', 'Oops!');
      return false;
    }
    if (this.appointmentFormGroup.value.fromTime.hour > this.appointmentFormGroup.value.toTime.hour) {
      this.toastr.errorToastr('From time cannot be less than To time ', 'Oops!');
      return false;
    } else if (this.appointmentFormGroup.value.fromTime.hour === this.appointmentFormGroup.value.toTime.hour
      && this.appointmentFormGroup.value.fromTime.minute > this.appointmentFormGroup.value.toTime.minute) {
      this.toastr.errorToastr('From time cannot be less than To time ', 'Oops!');
      return false;
    } else if (!this.ValidateFromToTime(this.appointmentFormGroup.value.fromTime.minute, this.appointmentFormGroup.value.toTime.minute)) {
      this.toastr.errorToastr('Minutes should be in multiple of \'15\' in From and To time ', 'Oops!');
      return false;
    }
    return true;
  }
  ValidateFromToTime(from: string, to: string): boolean {
    if ((Number(from) === 0 || Number(from) === 15 || Number(from) === 30 || Number(from) === 45) &&
      (Number(to) === 0 || Number(to) === 15 || Number(to) === 30 || Number(to) === 45)) {
      return true;
    } else { return false; }
  }

  validateActionReason(): boolean {
    if (this.appointmentFormGroup.value.reasonID === '0') {
      this.toastr.errorToastr('Please select reason ', 'Oops!');
      return false;
    }
    return true;
  }

  patietprofile() {
    this.patientSearchService.setPatientSearchInfo('patientMode', this.isflowsheet);
    this.router.navigate(['/patient-create'], { queryParams: { pid: this.patientId } });
  }
  validatePhoneno() {
    // /^(\()?\d{3}(\))?(-|\s)?-\d{3}-\d{4}$/;///^\d{3}-\d{3}-\d{4}$/;
    const phoneNumber = this.bookAppointmentFormGroup.controls['phone'].value;
    const phoneRGEX = /^(\()\d{3}(\))(-|\s)?-\d{3}-\d{4}$/;
    const phoneResult = phoneRGEX.test(phoneNumber);
    // alert("phone:" + phoneResult);
    return phoneResult;
  }
  acceptcopay() {
    this.router.navigate(['/accept-copay'], { queryParams: { pid: this.patientId } });
  }
  formatphone() {
    let phoneNumber = this.bookAppointmentFormGroup.controls['phone'].value;
    phoneNumber = phoneNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
    this.bookAppointmentFormGroup.patchValue({
      phone: phoneNumber
    });
    if (!this.validatePhoneno()) {
      this.toastr.errorToastr('Invalid Phone number.Phone number format must be (xxx)-xxx-xxxx', 'Oops!');
      this.bookAppointmentFormGroup.patchValue({
        phone: ''
      });
      return;
    }
  }

  encounter() {
    this.patientSearchService.setPatientInfo('patientInfo', this.patientInfo);
    this.router.navigate(['/patient-profile'], { queryParams: { id: this.appointmentId } });
  }
  public changedfromtime(): void {
    if (this.appointmentFormGroup.controls['fromTime'].value == null) {
    } else {
      if (this.appointmentFormGroup.controls['fromTime'].value != null &&
        this.appointmentFormGroup.controls['fromTime'].value.hour < 8 || this.appointmentFormGroup.controls['fromTime'].value.hour >= 18) {
        this.toastr.errorToastr('Invalid From Time', 'Oops!', { showCloseButton: true });
        this.appointmentFormGroup.patchValue({
          fromTime: { hour: 8, minute: 0, second: 0 }
        });
        return;
      } else if (this.appointmentFormGroup.controls['fromTime'].value.hour > this.appointmentFormGroup.controls['toTime'].value.hour) {
        // this.toastr.errorToastr("From time cannot be less than To time ", 'Oops!');
        if (this.appointmentFormGroup.controls['fromTime'].value.hour === 17) {
          this.appointmentFormGroup.patchValue({
            toTime: {
              hour: this.appointmentFormGroup.controls['fromTime'].value.hour,
              minute: this.appointmentFormGroup.controls['toTime'].value.minute, second: 0
            }
          });
        } else {
          if (this.appointmentFormGroup.controls['fromTime'].value.hour >= 18) {
            // this.toastr.errorToastr("Invalid From Time", 'Oops!');
            this.appointmentFormGroup.patchValue({
              fromTime: { hour: 8, minute: 0, second: 0 },
              toTime: { hour: 8, minute: 15, second: 0 }
            });
          } else {
            this.appointmentFormGroup.patchValue({
              toTime: {
                hour: this.appointmentFormGroup.controls['fromTime'].value.hour + 1,
                minute: this.appointmentFormGroup.controls['toTime'].value.minute, second: 0
              }

            });
          }
        }
        return;
      } else if (this.appointmentFormGroup.controls['fromTime'].value.hour === this.appointmentFormGroup.controls['toTime'].value.hour
        && this.appointmentFormGroup.controls['fromTime'].value.minute >= this.appointmentFormGroup.controls['toTime'].value.minute) {
        // this.toastr.errorToastr("From time cannot be less than To time ", 'Oops!');
        if (this.appointmentFormGroup.controls['toTime'].value.hour === 8
        && this.appointmentFormGroup.controls['toTime'].value.minute === 0) {
          this.appointmentFormGroup.patchValue({
            toTime: { hour: 8, minute: 15, second: 0 },
            fromTime: { hour: 8, minute: 0, second: 0 },
          });
          return;
        }
      }
      if (Number(this.appointmentFormGroup.controls['fromTime'].value.minute) === 45) {
        this.appointmentFormGroup.patchValue({
          toTime: {
            hour: this.appointmentFormGroup.controls['fromTime'].value.hour + 1,
            minute: 0, second: 0
          }
        });
      } else {
        this.appointmentFormGroup.patchValue({
          toTime: {
            hour: this.appointmentFormGroup.controls['fromTime'].value.hour,
            minute: 15 + this.appointmentFormGroup.controls['fromTime'].value.minute, second: 0
          }
        });
      }
    }
  }
  public changedtotime(): void {
    if (this.appointmentFormGroup.controls['toTime'].value == null) {
    } else {
      if (this.appointmentFormGroup.controls['toTime'].value != null &&
        this.appointmentFormGroup.controls['toTime'].value.hour < 8 ||
        (this.appointmentFormGroup.controls['toTime'].value.hour >= 18 && this.appointmentFormGroup.controls['toTime'].value.minute > 0)) {
        this.toastr.errorToastr('Invalid To Time', 'Oops!', { showCloseButton: true });
        this.appointmentFormGroup.patchValue({
          toTime: { hour: 8, minute: 15, second: 0 },
          fromTime: { hour: 8, minute: 0, second: 0 },
        });
        return;
      } else if (this.appointmentFormGroup.controls['fromTime'].value.hour > this.appointmentFormGroup.controls['toTime'].value.hour) {
        this.appointmentFormGroup.patchValue({
          toTime: { hour: 8, minute: 15, second: 0 },
          fromTime: { hour: 8, minute: 0, second: 0 },
        });
        return;
      } else if (this.appointmentFormGroup.controls['fromTime'].value.hour === this.appointmentFormGroup.controls['toTime'].value.hour
        && this.appointmentFormGroup.controls['fromTime'].value.minute >= this.appointmentFormGroup.controls['toTime'].value.minute) {
        if (this.appointmentFormGroup.controls['toTime'].value.hour === 8 &&
        this.appointmentFormGroup.controls['toTime'].value.minute === 0) {
          this.appointmentFormGroup.patchValue({
            toTime: { hour: 8, minute: 15, second: 0 },
            fromTime: { hour: 8, minute: 0, second: 0 },
          });
          return;
        }
        if (Number(this.appointmentFormGroup.controls['toTime'].value.minute) === 0) {
          this.appointmentFormGroup.patchValue({
            fromTime: {
              hour: this.appointmentFormGroup.controls['toTime'].value.hour - 1,
              minute: 45, second: 0
            }
          });
        } else {
          this.appointmentFormGroup.patchValue({
            fromTime: {
              hour: this.appointmentFormGroup.controls['toTime'].value.hour,
              minute: this.appointmentFormGroup.controls['toTime'].value.minute - 15, second: 0
            }
          });
        }
        return;
      }
    }
  }
}
