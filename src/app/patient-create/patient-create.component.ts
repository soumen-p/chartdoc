import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientDetail, EmployerContact, EmergencyContact, Social, Billing, Insurance, Authorization } from './patient-model';

import { SharedService } from 'src/app/core/shared.service';
import { PatientCreateService } from '../services/patient-create.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { R3FactoryDelegateType } from '@angular/compiler/src/render3/r3_factory';
@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  formData: FormData;
  socialfiles: File[] = [];
  billingfiles: File[] = [];
  insurancefiles: File[] = [];
  authorizationfiles: File[] = [];
  public socialwidth = 200;
  public billingwidth = 150;
  billingfileUrl = '';
  billingisEdit = false;
  socialfileUrl = '';
  socialIsEdit = false;
  authorizationfileUrl = '';
  authozationIsEdit = false;
  insuranceArray: Array<Insurance> = [];
  relationshipWithPatient = [];
  state = [];
  race = [];
  ethicity = [];
  preferredLanguage = [];
  preferredModeOfCommunication = [];
  providerName = [];
  providerNameTemp = '';
  policyType = '';
  status = '';
  minorStatus = false;
  minorchkStatus = false;
  authorizationSelectedFile: File = null;
  patientId = '0';
  ClsCreateUpdatePatient = {
    sPatientDetails: {},
    sPatientEmpContact: {},
    sPatientEmergency: {},
    sPatientSocial: {},
    sPatientBilling: {},
    sPatientInsurance: [],
    sPatientAuthorisation: {}
  };

  patientFormGroup = new FormGroup({
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl('')
  });

  patientContactFormGroup = new FormGroup({
    contactMobNo: new FormControl(''),
    contactPhone: new FormControl(''),
    contactEmail: new FormControl(''),
    contactAddressLine: new FormControl(''),
    contactAddressLine1: new FormControl(''),
    contactAddressCity: new FormControl(''),
    contactAddressState: new FormControl(''),
    contactAddressPostalCode: new FormControl(''),
    contactPrimaryPhone: new FormControl(''),
    contactSecondaryPhone: new FormControl(''),
    contactActive: new FormControl('Y'),
  });

  patientEmergencyFormGroup = new FormGroup({
    emergencyContactName: new FormControl(''),
    emergencyContactPhone: new FormControl(''),
    emergencyRelationship: new FormControl(''),
    employerFullName: new FormControl(''),
    employerPhone: new FormControl(''),
    employerAddress: new FormControl('')
  });

  patientSocial1FormGroup = new FormGroup({
    socialMaritalStatus: new FormControl(''),
    socialMaritalStatusOther: new FormControl('')
  });

  patientSocial2FormGroup = new FormGroup({
    socialGuardianFirstName: new FormControl(''),
    socialGuardianLastName: new FormControl(''),
    socialDOB: new FormControl(''),
    socialAddressLine: new FormControl(''),
    socialAddressCity: new FormControl(''),
    socialAddressState: new FormControl(''),
    socialAddressZip: new FormControl('')
  });

  patientSocial3FormGroup = new FormGroup({
    socialDOB: new FormControl(''),
    socialGuardianSSN: new FormControl(''),
    socialPhoneNumber: new FormControl('')
  });

  patientSocial4FormGroup = new FormGroup({
    socialPatientSSN: new FormControl(''),
    socialDriversLicenseFilePath: new FormControl(''),
    socialRace: new FormControl(''),
    socialLanguage: new FormControl(''),
    socialEthicity: new FormControl(''),
    socialCommMode: new FormControl('')
  });

  patientBillingFormGroup = new FormGroup({
    billingParty: new FormControl(''),
    billingPartyOther: new FormControl(''),
    billingFirstName: new FormControl(''),
    billingMiddleName: new FormControl(''),
    billingLastName: new FormControl(''),
    billingDOB: new FormControl(''),
    billingAddressLine: new FormControl(''),
    billingAddressLine1: new FormControl(''),
    billingAddressCity: new FormControl(''),
    billingAddressState: new FormControl(''),
    billingAddressZip: new FormControl(''),
    billingSSN: new FormControl(''),
    billingDriversLicenseFilePath: new FormControl(''),
    billingPrimaryPhone: new FormControl(''),
    billingSecondaryPhone: new FormControl('')
  });

  patientInsuranceFormGroup = new FormGroup({
    insuranceProviderName: new FormControl(''),
    insurancePolicy: new FormControl(''),
    insurancePolicyType: new FormControl(''),
    insuranceCardImageFilePath: new FormControl(''),
    insuranceEffectiveFrom: new FormControl(''),
    insuranceStatus: new FormControl('')
  });

  patientAuthorizationFormGroup = new FormGroup({
    authorizationFilePath: new FormControl('')
  });
  patientimage: any = '../../assets//PatientImages/noimage.png';
  constructor(private patientCreateService: PatientCreateService,
    private avRoute: ActivatedRoute, private router: Router, private sharedService: SharedService
    , public toastr: ToastrManager) {
    this.formData = new FormData();
  }

  ngOnInit() {
    if (this.avRoute.snapshot.queryParams.pid) {
      this.patientId = this.avRoute.snapshot.queryParams.pid;
      this.getPatientInfoByPatientId(this.patientId);
    }
    this.getMasterData('7');
    this.getMasterData('1');
    this.getMasterData('2');
    this.getMasterData('3');
    this.getMasterData('4');
    this.getMasterData('5');
    this.getMasterData('6');
    this.getMasterData('7');
  }

  onAuthorizationFileSelected(event) {
    this.authorizationSelectedFile = event.target.files[0];
    const formDataAuthorization = new FormData();
    formDataAuthorization.append(this.authorizationSelectedFile.name, this.authorizationSelectedFile, this.authorizationSelectedFile.name);
    this.patientCreateService.fileUpload(formDataAuthorization).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.toastr.errorToastr('please contact system admin!', 'Error!');
        console.log(err);
      }
    );
    console.log('this.insuranceSelectedFile:%o', this.authorizationSelectedFile);
  }

  addPolicy() {
    const policytypeId = this.patientInsuranceFormGroup.value.insurancePolicyType;
    let data;
    if (policytypeId === '1') {
      data = this.insuranceArray.find(ob => ob.policyTypeId === policytypeId);
    }
    if (data === undefined) {

      const insurance: Insurance = {
        patientId: this.patientId,
        providerId: this.patientInsuranceFormGroup.value.insuranceProviderName,
        providerName: this.providerNameTemp,
        insurancePolicy: this.patientInsuranceFormGroup.value.insurancePolicy,
        policyTypeId: this.patientInsuranceFormGroup.value.insurancePolicyType,
        policyType: this.policyType,
        cardImageFilePath: this.insurancefiles[0].name, // this.patientInsuranceFormGroup.value["insuranceCardImageFilePath"],
        effectiveFrom: this.patientInsuranceFormGroup.value.insuranceEffectiveFrom,
        statusId: this.patientInsuranceFormGroup.value.insuranceStatus,
        status: this.status,
        files: this.insurancefiles[0]
      };
      this.insuranceArray.push(insurance);
    } else {
      this.toastr.errorToastr('Primary insurance policy already exist!', 'Error!');

    }
    this.insurancefiles = [];
  }
  providerChangeHandler(event) {
    this.providerNameTemp = event.target.options[event.target.options.selectedIndex].text;
    // this.providerId=parseInt(event.target.value);
  }
  policyTypeChangeHandler(event) {
    this.policyType = event.target.options[event.target.options.selectedIndex].text;
  }
  statusChangeHandler(event) {
    this.status = event.target.options[event.target.options.selectedIndex].text;
  }
  checkMinor() {
    // alert("checkminor"+this.minorStatus)
  }

  checkmartialstatus(){
   
    if(this.patientSocial1FormGroup.value.socialMaritalStatus=="Single"){
      this.minorchkStatus=true;
    }else{
      this.minorchkStatus=false;
      this.minorStatus=false;
    }
  }
  validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if (re.test(this.patientContactFormGroup.value.contactEmail)) {
        return;
    }
    this.toastr.errorToastr("You have entered an invalid email address!", 'Error!');
    this.patientContactFormGroup.patchValue({
      contactEmail:""
    })
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  minorMandatoryValidation():boolean{
    let flag=false;
    if (this.patientSocial2FormGroup.value.socialGuardianFirstName == "") {
      this.toastr.errorToastr("Minor Guardian First Name Requried..", 'Error!');
      flag=true ;
    }
    else if (this.patientSocial2FormGroup.value.socialGuardianLastName == "") {
      this.toastr.errorToastr("Minor  Guardian Last Name Requried..", 'Error!');
      flag=true ;
    }
    else if (this.patientSocial2FormGroup.value.socialAddressLine == "") {
      this.toastr.errorToastr("Minor  Mailing Address Requried..", 'Error!');
      flag=true ;
    }
    else if (this.patientSocial2FormGroup.value.socialAddressCity == "") {
      this.toastr.errorToastr("Minor City Requried..", 'Error!');
      flag=true ;
    }
    else if (this.patientSocial2FormGroup.value.socialAddressState == "") {
      this.toastr.errorToastr("Minor State Requried..", 'Error!');
      flag=true ;
    }
   else  if (this.patientSocial2FormGroup.value.socialAddressZip == "") {
      this.toastr.errorToastr("Minor Zip Requried..", 'Error!');
      flag=true ;
    }
    return flag;
  }
  finish() {
    if (this.patientFormGroup.value.firstName == "") {
      this.toastr.errorToastr("First Name Requried..", 'Error!');
      return;
    }
    if (this.patientFormGroup.value.lastName == "") {
      this.toastr.errorToastr("Last Name Requried..", 'Error!');
      return;
    }
    if (this.patientFormGroup.value.dob == "") {
      this.toastr.errorToastr("Date of Birth.", 'Error!');
      return;
    }
    if (this.patientFormGroup.value.gender == "") {
      this.toastr.errorToastr("Gender Requried..", 'Error!');
      return;
    }
    if (this.patientContactFormGroup.value.contactPrimaryPhone == "") {
      this.toastr.errorToastr("Primary Phone..", 'Error!');
      return;
    }
    if (this.patientContactFormGroup.value.contactEmail == "") {
      this.toastr.errorToastr("Email Requried..", 'Error!');
      return;
    }
    if (this.patientContactFormGroup.value.contactAddressLine == "") {
      this.toastr.errorToastr("Street1 Requried..", 'Error!');
      return;
    }
    if (this.patientContactFormGroup.value.contactAddressLine1 == "") {
      this.toastr.errorToastr("Street2 Requried..", 'Error!');
      return;
    }
    if (this.patientContactFormGroup.value.contactAddressCity == "") {
      this.toastr.errorToastr("City Requried..", 'Error!');
      return;
    }
    if (this.patientContactFormGroup.value.contactAddressState == "") {
      this.toastr.errorToastr("State Requried..", 'Error!');
      return;
    }
    if (this.patientContactFormGroup.value.contactAddressPostalCode == "") {
      this.toastr.errorToastr("Zip..", 'Error!');
      return;
    }
    if(this.minorStatus && this.minorMandatoryValidation()){
      return;
    }
   
    this.ClsCreateUpdatePatient.sPatientDetails = this.getPatient();
    this.ClsCreateUpdatePatient.sPatientEmpContact = this.getEmployerContact();
    this.ClsCreateUpdatePatient.sPatientEmergency = this.getPatientEmergency();
    console.log(this.ClsCreateUpdatePatient.sPatientEmergency);
    this.ClsCreateUpdatePatient.sPatientSocial = this.getPatientSocial();
    this.ClsCreateUpdatePatient.sPatientBilling = this.getPatientBilling();
    this.ClsCreateUpdatePatient.sPatientInsurance = this.getPatientInsurance();
    this.ClsCreateUpdatePatient.sPatientAuthorisation = this.getPatientAuthorization();


    if (this.ClsCreateUpdatePatient.sPatientInsurance.length === 0) {
      this.toastr.errorToastr('Please Add Insurance!', 'Error!');
      return;
    }
    this.formData.append('createUpdatePatient', JSON.stringify(this.ClsCreateUpdatePatient));
    this.formData.append('social', this.socialfiles[0]);
    this.formData.append('billing', this.billingfiles[0]);
    this.formData.append('profile', this.profileImgpath);
    let index = 0;
    this.ClsCreateUpdatePatient.sPatientInsurance.forEach(element => {
      index++;
      this.formData.append('insurances_' + String(index), element.files);
    });
    this.formData.append('authorization', this.authorizationfiles[0]);
    console.log(this.formData.get('createUpdatePatient'));


    this.patientCreateService.savePatient(this.formData)
      .subscribe
      (
        res => {
          // console.log('Response:%o', res);
          const patientTemp = {
            PatientId: res.split('~')[0],
            FirstName: this.patientFormGroup.value.firstName,
            MiddleName: this.patientFormGroup.value.middleName,
            LastName: this.patientFormGroup.value.lastName,
            DOB: this.patientFormGroup.value.dob,
            Gender: this.patientFormGroup.value.gender,
            ImagePath: res.split('~')[1] //this.patientimage
          };
          this.sharedService.setLocalItem('patientDetail', patientTemp);
          this.router.navigate(['/patient-others']);
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          console.log(err);
        }
      );
  }

  getPatient() {
    const patient: PatientDetail = {
      patientId: this.patientId,
      firstName: this.patientFormGroup.value.firstName,
      middleName: this.patientFormGroup.value.middleName,
      lastName: this.patientFormGroup.value.lastName,
      addressLine: this.patientContactFormGroup.value.contactAddressLine,
      addressLine1: this.patientContactFormGroup.value.contactAddressLine1,
      addressCity: this.patientContactFormGroup.value.contactAddressCity,
      addressState: this.patientContactFormGroup.value.contactAddressState,
      addressPostalCode: this.patientContactFormGroup.value.contactAddressPostalCode,
      addressCountry: '',
      dob: this.patientFormGroup.value.dob,
      gender: this.patientFormGroup.value.gender,
      email: this.patientContactFormGroup.value.contactEmail,
      mobNo: this.patientContactFormGroup.value.contactPrimaryPhone,
      primaryPhone: this.patientContactFormGroup.value.contactPrimaryPhone,
      secondaryPhone: this.patientContactFormGroup.value.contactSecondaryPhone,
      imageName: '',
      imagePath: this.patientimage,
      flag: this.patientContactFormGroup.value.contactActive,
      age: '',
      recopiaId: '',
      recopiaName: ''
    };
    return patient;
  }

  getPatientEmergency() {
    const emergencyContact: EmergencyContact = {
      patientId: this.patientId,
      contactName: this.patientEmergencyFormGroup.value.emergencyContactName,
      contactPhone: this.patientEmergencyFormGroup.value.emergencyContactPhone,
      relationship: this.patientEmergencyFormGroup.value.emergencyRelationship
    };
    return emergencyContact;
  }

  getEmployerContact() {
    const employerContact: EmployerContact = {
      patientId: this.patientId,
      name: this.patientEmergencyFormGroup.value.employerFullName,
      phone: this.patientEmergencyFormGroup.value.employerPhone,
      address: this.patientEmergencyFormGroup.value.employerAddress
    };
    return employerContact;
  }

  getPatientSocial() {
    const social: Social = {
      patientId: this.patientId,
      maritalStatus: this.patientSocial1FormGroup.value.socialMaritalStatus,
      guardianFName: this.patientSocial2FormGroup.value.socialGuardianFirstName,
      guardianLName: this.patientSocial2FormGroup.value.socialGuardianLastName,
      addLine: this.patientSocial2FormGroup.value.socialAddressLine,
      addCity: this.patientSocial2FormGroup.value.socialAddressCity,
      addState: this.patientSocial2FormGroup.value.socialAddressState,
      addZip: this.patientSocial2FormGroup.value.socialAddressZip,
      dob: this.patientSocial3FormGroup.value.socialDOB,
      patientSSN: this.patientSocial4FormGroup.value.socialPatientSSN,
      phoneNumber: this.patientSocial3FormGroup.value.socialPhoneNumber,
      guardianSSN: this.patientSocial3FormGroup.value.socialGuardianSSN,
      driversLicenseFilePath: this.patientSocial4FormGroup.value.socialDriversLicenseFilePath,
      race: this.patientSocial4FormGroup.value.socialRace,
      ethicity: this.patientSocial4FormGroup.value.socialEthicity,
      language: this.patientSocial4FormGroup.value.socialLanguage,
      commMode: this.patientSocial4FormGroup.value.socialCommMode,
    };
    return social;
  }
  getPatientBilling() {
    const billing: Billing = {
      patientId: this.patientId,
      billingParty: this.patientBillingFormGroup.value.billingParty,
      firstName: this.patientBillingFormGroup.value.billingFirstName,
      middleName: this.patientBillingFormGroup.value.billingMiddleName,
      lastName: this.patientBillingFormGroup.value.billingLastName,
      dob: this.patientBillingFormGroup.value.billingDOB,
      addLine: this.patientBillingFormGroup.value.billingAddressLine,
      addLine1: this.patientBillingFormGroup.value.billingAddressLine1,
      addCity: this.patientBillingFormGroup.value.billingAddressCity,
      addState: this.patientBillingFormGroup.value.billingAddressState,
      addZip: this.patientBillingFormGroup.value.billingAddressZip,
      SSN: this.patientBillingFormGroup.value.billingSSN,
      driversLicenseFilePath: this.patientBillingFormGroup.value.billingDriversLicenseFilePath,
      primaryPhone: this.patientBillingFormGroup.value.billingPrimaryPhone,
      secondaryPhone: this.patientBillingFormGroup.value.billingSecondaryPhone,
    };
    return billing;
  }

  getPatientInsurance() {
    return this.insuranceArray;
  }

  getPatientAuthorization() {
    const authorization: Authorization = {
      patientId: this.patientId,
      authorizationFilePath: this.patientAuthorizationFormGroup.value.authorizationFilePath
    };
    return authorization;
  }
  deleteRow(index) {
    this.insuranceArray.splice(index, 1);
  }

  getPatientInfoByPatientId(patientId) {
    this.patientCreateService.getPatientInfoByPatientId(patientId)
      .subscribe
      (
        res => {
          // console.log('Response:%o', res);
          this.patientId = res.sPatientDetails.patientId;
          if (res.sPatientDetails.imagePath !== '') {
            this.patientimage = res.sPatientDetails.imagePath;
          }
          this.setPatient(res.sPatientDetails);
          if (res.sPatientEmergency != null) {
            this.setPatientEmergency(res.sPatientEmergency);
          }
          if (res.sPatientEmpContact != null) {
            this.setEmployerContact(res.sPatientEmpContact);
          }
          if (res.sPatientSocial != null) {
            this.setPatientSocial(res.sPatientSocial);
          }
          if (res.sPatientBilling != null) {
            this.setPatientBilling(res.sPatientBilling);
          }
          if (res.sPatientInsurance != null) {
            this.setPatientInsurance(res.sPatientInsurance);
          }
          if (res.sPatientAuthorisation !== null) {
            this.setPatientAuthorization(res.sPatientAuthorisation);
          }
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          console.log(err);
        }
      );
  }

  setPatient(sPatientDetails) {
    this.patientId = sPatientDetails.patientId;
    this.patientFormGroup.patchValue({
      firstName: sPatientDetails.firstName,
      middleName: sPatientDetails.middleName,
      lastName: sPatientDetails.lastName,
      dob: sPatientDetails.dob,
      gender: sPatientDetails.gender
    });
    this.patientContactFormGroup.patchValue({
      contactAddressLine: sPatientDetails.addressLine,
      contactAddressLine1: sPatientDetails.addressLine1,
      contactAddressCity: sPatientDetails.addressCity,
      contactAddressState: sPatientDetails.addressState,
      contactAddressPostalCode: sPatientDetails.addressPostalCode,
      contactEmail: sPatientDetails.email,
      contactActive: sPatientDetails.flag,
      contactMobNo: sPatientDetails.mobNo,
      contactPrimaryPhone: (sPatientDetails.primaryPhone === '') ? sPatientDetails.mobNo : sPatientDetails.primaryPhone,
      contactSecondaryPhone: sPatientDetails.secondaryPhone
    });
  }

  setPatientEmergency(sPatientEmergency) {
    this.patientEmergencyFormGroup.patchValue({
      emergencyContactName: sPatientEmergency.contactName,
      emergencyContactPhone: sPatientEmergency.contactPhone,
      emergencyRelationship: sPatientEmergency.relationship
    });
  }

  setEmployerContact(sPatientEmpContact) {
    this.patientEmergencyFormGroup.patchValue({
      employerFullName: sPatientEmpContact.name,
      employerPhone: sPatientEmpContact.phone,
      employerAddress: sPatientEmpContact.address
    });
  }

  setPatientSocial(sPatientSocial) {
    this.patientSocial1FormGroup.patchValue({
      socialMaritalStatus: sPatientSocial.maritalStatus
    });
    
      this.checkmartialstatus();
    if(sPatientSocial.guardianFName!=""){
      this.minorStatus=true;
    }
    this.patientSocial2FormGroup.patchValue({
      socialGuardianFirstName: sPatientSocial.guardianFName,
      socialGuardianLastName: sPatientSocial.guardianLName,
      socialDOB: sPatientSocial.DOB,
      socialAddressLine: sPatientSocial.addLine,
      socialAddressCity: sPatientSocial.addCity,
      socialAddressState: sPatientSocial.addState,
      socialAddressZip: sPatientSocial.addZip
    });
    this.patientSocial3FormGroup.patchValue({
      socialDOB: sPatientSocial.DOB,
      socialPhoneNumber: sPatientSocial.phoneNumber,
      socialGuardianSSN: sPatientSocial.guardianSSN
    });
    /* display image --start */
    this.socialIsEdit = true;
    this.socialfileUrl = sPatientSocial.driversLicenseFilePath;
    /* display image --end */
    this.patientSocial4FormGroup.patchValue({
      socialPatientSSN: sPatientSocial.patientSSN,
      // socialDriversLicenseFilePath:sPatientSocial.DriversLicenseFilePath,
      socialRace: sPatientSocial.race,
      socialEthicity: sPatientSocial.ethicity,
      socialLanguage: sPatientSocial.language,
      socialCommMode: sPatientSocial.commMode,
    });

  }
  setPatientBilling(sPatientBilling) {
    /* added for image binding-- start */
    this.billingisEdit = true;
    this.billingfileUrl = sPatientBilling.driversLicenseFilePath;
    /* added for image binding --end */
    this.patientBillingFormGroup.patchValue({
      billingParty: sPatientBilling.billingParty,
      billingFirstName: sPatientBilling.firstName,
      billingMiddleName: sPatientBilling.middleName,
      billingLastName: sPatientBilling.lastName,
      billingDOB: sPatientBilling.dob,
      billingAddressLine: sPatientBilling.addLine,
      billingAddressLine1: sPatientBilling.addLine1,
      billingAddressCity: sPatientBilling.addCity,
      billingAddressState: sPatientBilling.addState,
      billingAddressZip: sPatientBilling.addZip,
      billingSSN: sPatientBilling.SSN,
      billingPrimaryPhone: sPatientBilling.primaryPhone,
      billingSecondaryPhone: sPatientBilling.secondaryPhone
    });
  }

  setPatientInsurance(sPatientInsurance) {
    sPatientInsurance.forEach(element => {
      const insurance: Insurance = {
        patientId: element.patientId,
        providerName: element.providerName,
        providerId: element.providerId,
        insurancePolicy: element.insurancePolicy,
        policyType: element.policyType,
        policyTypeId: element.policyTypeId,
        cardImageFilePath: element.cardImageFilePath,
        effectiveFrom: element.effectiveFrom,
        statusId: element.statusId,
        status: element.status,
        files: this.insurancefiles[0],
      };
      this.insuranceArray.push(insurance);
    });
    return this.insuranceArray;
  }

  setPatientAuthorization(sPatientAuthorization) {
    this.authozationIsEdit = true;
    this.authorizationfileUrl = sPatientAuthorization.authorizationFilePath;
    this.patientAuthorizationFormGroup.patchValue({
      // authorizationFilePath: sPatientAuthorization.AuthorizationFilePath
    });
  }

  getMasterData(key) {
    this.patientCreateService.getMasterData(key)
      .subscribe
      (
        res => {
          console.log('[getMasterData]-Response:%o', res);
          switch (key) {
            case '1':
              this.relationshipWithPatient = res;
              break;
            case '2':
              this.state = res;
              break;
            case '3':
              this.race = res;
              break;
            case '4':
              this.ethicity = res;
              break;
            case '5':
              this.preferredLanguage = res;
              break;
            case '6':
              this.preferredModeOfCommunication = res;
              break;
            case '7':
              this.providerName = res;
              break;
          }
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          console.log(err);
        }
      );
  }
  formatphone(strphoneNumber: any, strcaption: any): any {
    let phoneNumber = strphoneNumber;
    phoneNumber = phoneNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');

    if (!this.validatePhoneno(phoneNumber)) {
      phoneNumber = '';
      this.toastr.errorToastr('Invalid ' + strcaption + '.Phone number format must be (xxx)-xxx-xxxx', 'Oops!');
    }
    return phoneNumber;

  }
  validatePhoneno(strphoneNumber: any) {
    // /^(\()?\d{3}(\))?(-|\s)?-\d{3}-\d{4}$/;///^\d{3}-\d{3}-\d{4}$/;

    const phoneNumber = strphoneNumber;
    const phoneRGEX = /^(\()\d{3}(\))(-|\s)?-\d{3}-\d{4}$/;
    const phoneResult = phoneRGEX.test(phoneNumber);
    return phoneResult;
  }
  validateprimaryphone() {
    const phoneNumber = this.formatphone(this.patientContactFormGroup.value.contactPrimaryPhone, 'Primary Phone');
    this.patientContactFormGroup.patchValue({
      contactPrimaryPhone: phoneNumber
    });
  }
  validatesecondaryPhone() {
    const phoneNumber = this.formatphone(this.patientContactFormGroup.value.contactSecondaryPhone, 'Secondary Phone');
    this.patientContactFormGroup.patchValue({
      contactSecondaryPhone: phoneNumber
    });
  }
  validateemergencyphone() {
    const phoneNumber = this.formatphone(this.patientEmergencyFormGroup.value.emergencyContactPhone, 'Emergency Contact Phone');
    this.patientEmergencyFormGroup.patchValue({
      emergencyContactPhone: phoneNumber
    });
  }
  validateemployerphone() {
    const phoneNumber = this.formatphone(this.patientEmergencyFormGroup.value.employerPhone, 'Employer Phone');
    this.patientEmergencyFormGroup.patchValue({
      employerPhone: phoneNumber
    });
  }
  validatesocailphone() {
    const phoneNumber = this.formatphone(this.patientSocial3FormGroup.value.socialPhoneNumber, 'Socail Phone');
    this.patientSocial3FormGroup.patchValue({
      socialPhoneNumber: phoneNumber
    });
  }
  validatebillingPrimary() {
    const phoneNumber = this.formatphone(this.patientBillingFormGroup.value.billingPrimaryPhone, 'Billing Primary Phone');
    this.patientBillingFormGroup.patchValue({
      billingPrimaryPhone: phoneNumber
    });
  }
  validatebillingSecondary() {
    const phoneNumber = this.formatphone(this.patientBillingFormGroup.value.billingSecondaryPhone, 'Billing Secondary Phone');
    this.patientBillingFormGroup.patchValue({
      billingSecondaryPhone: phoneNumber
    });
  }
  cancel() {
    if (this.sharedService.getLocalItem('patientMode') === 'edit-patient') {
      this.router.navigate(['/patient-search'], { queryParams: { mode: 'edit-patient' } });
    } else {
      this.router.navigate(['/flowsheet-book-appointment'], { queryParams: { id: this.sharedService.getLocalItem('patientMode') } });
    }
  }
  url: any;
  profileImgpath: any;
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.profileImgpath = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const self = this;
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        console.log(event);
        self.url = event.target.result;
      };
    }
  }
}
