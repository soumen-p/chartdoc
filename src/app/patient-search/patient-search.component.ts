import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../models/patient.model';
import { PatientSearchService } from '../services/patient-search.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {

  public id: string;
  public firstName = '';
  public lastName = '';
  public middleName = '';
  public address: string;
  public dob: Date;
  public gender = '';
  public identifier: string;
  public telecom = '';
  public patientList: Patient[] = [];
  public email: string;
  public mobNo: string;
  public errMsg: string;
  public isRecordFound = false;
  public id1: string;
  public patientInfo: FormGroup;
  public patientSearch: any[] = [];
  public urlflg = 0;
  public isbackButtonVisible = false;
  public SearchDob: string;
  public Searchmode: string;
  public Isactivated : string;
  pageOfItems: Array<any>;

  constructor(private patientSearchService: PatientSearchService,
    private router: Router,
    private _avRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) {
    this.patientInfo = this.formBuilder.group({
      patientId: '',
      flag: '',
      patientFirstName: '',
      patientLastName: '',
      patientFullName: '',
      patientImagePath: '',
      patientAge: '',
      patientGender: '',
      rcopiaId: '',
      rcopiaName: ''
    });
    this.Isactivated="";
    if (this._avRoute.snapshot.queryParams.id) {
      this.urlflg = this._avRoute.snapshot.queryParams.id;
      this.isbackButtonVisible = true;
      this.Isactivated="Y";
    }
    if (this._avRoute.snapshot.queryParams.mode) {
      this.Searchmode = this._avRoute.snapshot.queryParams.mode;
      //this.Isactivated="Y";
      this.patientSearchService.setPatientSearchInfo('patientMode', this.Searchmode);
    }
  }

  ngOnInit() {
    this.errMsg = '';
    // this.getAllPatients();
  }

  PerformPatientsearch(e: Event, firstName: string, lastName: string, email: string, dob: Date, telecom: string) {
    e.preventDefault();
    this.SearchDob = this.datePipe.transform(dob, 'yyyyMMdd');
    // alert(this.SearchDob);
    this.patientSearchService.PerformPatientsearch(firstName, lastName, email, this.SearchDob, telecom, this.gender,this.Isactivated)
      .subscribe((res) => {
        this.patientList = res as Patient[];
        if (this.patientList.length > 0) {
          this.patientSearchService.setPatientSearchInfo('patientSearch', this.patientList);
          console.log('patient Data', this.patientList)
          this.isRecordFound = true;
        } else {
          this.isRecordFound = false;
          this.errMsg = 'No Records to Display.';
        }
      },
        err => {
          console.log(err);
        });
  }

  getAllPatients() {
    this.patientSearchService.searchPatients(this.firstName, this.lastName)
      .subscribe((res) => {
        this.patientList = res;

        if (this.patientList.length > 0) {
          this.patientSearchService.setPatientSearchInfo('patientSearch', this.patientList);
          this.isRecordFound = true;
        } else {
          this.isRecordFound = false;
          this.errMsg = 'No Records to Display.';
        }
      },
        err => {
          console.log(err);
        });
  }

  searchPatients(e: Event) {
    e.preventDefault();
    this.firstName = this.firstName !== '' ? this.firstName : '';
    this.lastName = this.lastName !== '' ? this.lastName : '';
    this.gender = this.gender !== 'Choose...' ? this.gender : '';
    this.telecom = this.telecom !== '' ? this.telecom : '';

    this.patientSearch = this.patientSearchService.getPatientSearchInfo('patientSearch');
    this.patientList.length = 0;
    this.patientSearch.filter(result => {
      if (this.gender === '' ?
        (this.telecom === '' ?
          (this.firstName === '' ?
            (this.lastName === '' ?
			        (this.middleName === '' ? this.getAllPatients()
			    : result.middleName.trim().toLowerCase().match(this.middleName.toLowerCase()))	
          : result.middleName.trim().toLowerCase().match(this.middleName.toLowerCase()) && result.LastName.trim().toLowerCase().match(this.lastName.toLowerCase()))			
          : result.middleName.trim().toLowerCase().match(this.middleName.toLowerCase()) && result.LastName.trim().toLowerCase().match(this.lastName.toLowerCase()) && result.FirstName.trim().toLowerCase().match(this.firstName.toLowerCase())) 
			    : result.middleName.trim().toLowerCase().match(this.middleName.toLowerCase()) && result.LastName.trim().toLowerCase().match(this.lastName.toLowerCase()) && result.FirstName.trim().toLowerCase().match(this.firstName.toLowerCase()) && result.MobNo.trim().toLowerCase().match(this.telecom.toLowerCase())) 
		      : result.middleName.trim().toLowerCase().match(this.middleName.toLowerCase()) && result.LastName.trim().toLowerCase().match(this.lastName.toLowerCase()) && result.FirstName.trim().toLowerCase().match(this.firstName.toLowerCase()) && result.MobNo.trim().toLowerCase().match(this.telecom.toLowerCase()) && result.Gender.trim().toLowerCase() === this.gender.toLowerCase()) {
        this.patientList.push(result);
      }
    });
  }

  viewPatientDetails(patinetId: string, flag: string, patientFirstName: string, patientLastName: string,patientMiddleName: string, patientImagePath: string,
                     patientAge: string, patientGender: string, rcopiaId: string, rcopiaName: string, email: string, mobNo: string
    , dob: string, gender: string, address: string) {
    let urlPatientQueryParam = '';
    if (this._avRoute.snapshot.queryParams.mode) {
      urlPatientQueryParam = this._avRoute.snapshot.queryParams.mode;
    }
    if (this.urlflg == 1) {

      const doctorBookingInfo = this.patientSearchService.getPatientSearchInfo('doctorBookingInfo');
      this.patientSearchService.setPatientSearchInfo('doctorBookingInfo', {
        'doctorid': doctorBookingInfo.doctorid,
        'doctorname': doctorBookingInfo.doctorname,
        'startdate': doctorBookingInfo.startdate,
        'enddate': doctorBookingInfo.enddate,
        'starttime': doctorBookingInfo.starttime,
        'endtime': doctorBookingInfo.endtime,
        'patientname': patientFirstName.trim() + ' ' + patientMiddleName.trim() + ' ' + patientLastName.trim(),
        'patientId': patinetId,
        'appointmentid': '0',
        'email': email,
        'phone': mobNo,
        'dateOfBirth': dob,
        'gender': gender,
        'address': address,
        'serviceID': doctorBookingInfo.serviceID !== '' ? doctorBookingInfo.serviceID : '',
        'positionID': doctorBookingInfo.position !== '' ? doctorBookingInfo.positionID : '0',
        'reasonID': doctorBookingInfo.reasonID !== '' ? doctorBookingInfo.reasonID : '0',
        'reasonCode': '0',
        'note': doctorBookingInfo.note
      });


      this.router.navigate(['/book-appointment']);
      return;
    } 
    else if (this.urlflg ==2) {
      this.patientSearchService.setPatientSearchInfo('addPaymentInfo', {
        'patientname': patientFirstName.trim() + ' ' + patientLastName.trim(),
        'patientId': patinetId,
        'appointmentid': '0',
        'email': email,
        'phone': mobNo,
        'dateOfBirth': dob,
        'gender': gender,
        'address': address,
        'reasonCode': '0',
      });
      this.router.navigate(['/add-payment']);
      return;
    } 
    else if (urlPatientQueryParam == 'edit-patient') {
      this.router.navigate(['/patient-create'], { queryParams: { pid: patinetId } });
      return;
    }
    else if (urlPatientQueryParam == 'patient-history') {
      this.router.navigate(['/viewpatient-history'], { queryParams: { pid: patinetId } });
      return;
    }
    this.patientInfo.setValue({
      patientId: patinetId,
      flag: flag,
      patientFirstName: patientFirstName,
      patientLastName: patientLastName,
      patientFullName: patientFirstName + ' ' + patientLastName,
      patientImagePath: patientImagePath,
      patientAge: patientAge,
      patientGender: patientGender,
      rcopiaId: rcopiaId,
      rcopiaName: rcopiaName
    });


    this.patientSearchService.setPatientInfo('patientInfo', this.patientInfo.value)

    this.router.navigateByUrl('/login', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/patient-profile']);
      });

  }
  back() {
    if (this.urlflg > 0) {
      this.router.navigate(['/book-appointment']);
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
