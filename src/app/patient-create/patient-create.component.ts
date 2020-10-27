import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  PatientDetail, EmployerContact, EmergencyContact, Social, Billing, Insurance, Authorization,
  Alert, Allergies, Immunizations, Socials, Families
} from './patient-model';

import { SharedService } from 'src/app/core/shared.service';
import { PatientCreateService } from '../services/patient-create.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { R3FactoryDelegateType } from '@angular/compiler/src/render3/r3_factory';
import { min } from 'rxjs/operators';
import { PatientValidation } from '../models/patient-validation.model';

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
  patientValidate: PatientValidation = {
    dob: '',
    gender: '',
    patientId: '',
    patientfName: '',
    patientlName: '',
    patientmName: '',
    ssn: ''
  };
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
  disothers = true;
  disbiilingothers = true;
  isbillingEdit = false;
  minorchkStatus = false;
  authorizationSelectedFile: File = null;
  patientId = '0';

  now = new Date();
  year = this.now.getFullYear();
  month = String(this.now.getMonth() + 1).padStart(2, '0');;
  day = String(this.now.getDate()).padStart(2, '0');
  minDate = String(this.year - 100 + "-" + this.month + "-" + this.day);

  ///Other Info  
  allergyArray: Array<Allergies> = [];
  immunizationArray: Array<Immunizations> = [];
  socailArray: Array<Socials> = [];
  familyArray: Array<Families> = [];
  alertArray: Array<Alert> = [];
  alertKeywordArray = [];
  allergiesArray = [];
  iMMUNIZATIONSArray = [];
  ClsAllergyImmunization = {
    patientId: '0',
    allergies: [],
    immunizations: [],
    socials: [],
    alert: {},
    families: [],

  };


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
  alertDesc: '';
  alertId: '';
  ///Other Info

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
    dob: new FormControl(''),
    socialPatientSSN: new FormControl(''),
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
      ///Other Info
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
          
        },
          err => {
            
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
          
        },
          err => {
            
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
          
        },
          err => {
            
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
          
        },
          err => {
            
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
            this.alertDesc = element.description;
            this.alertId = element.code;
          });
          
        },
          err => {
            
          });
      ///Other Info
    }
    this.getMasterData('7');
    this.getMasterData('1');
    this.getMasterData('2');
    this.getMasterData('3');
    this.getMasterData('4');
    this.getMasterData('5');
    this.getMasterData('6');
    this.getMasterData('7');
    ///Other Info
    this.getMasterData('8');
    this.getMasterData('11');
    this.getMasterData('12');
    ///Other Info
  }

  onAuthorizationFileSelected(event) {
    this.authorizationSelectedFile = event.target.files[0];
    const formDataAuthorization = new FormData();
    formDataAuthorization.append(this.authorizationSelectedFile.name, this.authorizationSelectedFile, this.authorizationSelectedFile.name);
    this.patientCreateService.fileUpload(formDataAuthorization).subscribe(
      res => {
        
      },
      err => {
        this.toastr.errorToastr('please contact system admin!', 'Error!');
        
      }
    );
    
  }
  effetivedateValidation(): boolean {
    let flgdate = true;
    
    if (new Date(this.patientInsuranceFormGroup.value.insuranceEffectiveFrom) < new Date(this.minDate)) {
      this.toastr.errorToastr('Invalid Effective From Date ' + this.patientInsuranceFormGroup.value.insuranceEffectiveFrom + '', 'Oops!');
      flgdate = false;
    }
    else if (new Date(this.patientInsuranceFormGroup.value.insuranceEffectiveFrom) > new Date(this.getToday())) {
      this.toastr.errorToastr('Invalid Effective From Date' + this.patientInsuranceFormGroup.value.insuranceEffectiveFrom + '', 'Oops!');
      flgdate = false;
    }
    return flgdate;
  }
  addPolicy() {
    const policytypeId = this.patientInsuranceFormGroup.value.insurancePolicyType;
    let data;
    if (policytypeId === '1') {
      data = this.insuranceArray.find(ob => ob.policyTypeId === policytypeId);
    }
    if (data === undefined) {
      if (this.patientInsuranceFormGroup.value.insuranceProviderName == "") {
        this.toastr.errorToastr('Insurance Company Name!', 'Error!');
        return;
      }
      if (this.patientInsuranceFormGroup.value.insurancePolicy == "") {
        this.toastr.errorToastr('Insurance Policy !', 'Error!');
        return;
      }
      if (this.patientInsuranceFormGroup.value.insurancePolicyType == "") {
        this.toastr.errorToastr('Policy Type requried..!', 'Error!');
        return;
      }
      if (this.patientInsuranceFormGroup.value.insuranceEffectiveFrom == "") {
        this.toastr.errorToastr('Effective From requried..!', 'Error!');
        return;
      }
      if (this.patientInsuranceFormGroup.value.insuranceStatus == "") {
        this.toastr.errorToastr('Status requried..!', 'Error!');
        return;
      }
      if (!this.effetivedateValidation()) {
        return;
      }
      if (this.insurancefiles.length == 0) {
        this.toastr.errorToastr('Card image requried..!', 'Error!');
        return;
      }

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
      this.patientInsuranceFormGroup.reset();
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
    this.patientSocial2FormGroup.patchValue({
      socialGuardianFirstName: "",
      socialGuardianLastName: "",
      socialAddressLine: "",
      socialAddressCity: "",
      socialAddressState: "",
      socialAddressZip: "",
    })
    this.patientSocial3FormGroup.patchValue({
      socialDOB: "",
      socialGuardianSSN: "",
      socialPhoneNumber: ""
    })
    if (this.minorStatus && this.patientBillingFormGroup.value.billingParty == "Self") {
      this.patientBillingFormGroup.patchValue({
        billingParty: "",
        billingFirstName: "",
        billingMiddleName: "",
        billingLastName: "",
        billingAddressLine: "",
        billingAddressLine1: "",
        billingAddressCity: "",
        billingAddressState: "",
        billingAddressZip: "",
        billingDOB: "",
        billingSSN: "",
        billingPrimaryPhone: "",
        billingSecondaryPhone: "",
      })
    }
  }
  checkbillingstatus() {
    this.disbiilingothers = true;
    let billingstatus = this.patientBillingFormGroup.value.billingParty;
    if (this.patientBillingFormGroup.value.billingParty == "Spouse" || this.patientBillingFormGroup.value.billingParty == "Parent") {
      this.isbillingEdit = true;
      this.billingfiles = [];
      this.billingfileUrl = "";
      this.patientBillingFormGroup.reset();
      this.patientBillingFormGroup.patchValue({
        billingParty: billingstatus,
        billingFirstName: "",
        billingMiddleName: "",
        billingLastName: "",
        billingAddressLine: "",
        billingAddressLine1: "",
        billingAddressCity: "",
        billingAddressState: "",
        billingAddressZip: "",
        billingDOB: "",
        billingSSN: "",
        billingPrimaryPhone: "",
        billingSecondaryPhone: "",
        billingPartyOther: "",
      })

    } else if (this.patientBillingFormGroup.value.billingParty == "Self") {
      this.isbillingEdit = false;
      if (this.socialfiles.length > 0) {

        this.billingfiles[0] = this.socialfiles[0];
        this.billingfileUrl = this.socialfileUrl;
      }
      this.patientBillingFormGroup.patchValue({
        billingFirstName: this.patientFormGroup.value.firstName,
        billingMiddleName: this.patientFormGroup.value.middleName,
        billingLastName: this.patientFormGroup.value.lastName,
        billingAddressLine: this.patientContactFormGroup.value.contactAddressLine,
        billingAddressLine1: this.patientContactFormGroup.value.contactAddressLine1,
        billingAddressCity: this.patientContactFormGroup.value.contactAddressCity,
        billingAddressState: this.patientContactFormGroup.value.contactAddressState,
        billingAddressZip: this.patientContactFormGroup.value.contactAddressPostalCode,
        billingDOB: this.patientFormGroup.value.dob,
        billingSSN: this.patientFormGroup.value.socialPatientSSN,
        billingPrimaryPhone: this.patientContactFormGroup.value.contactPrimaryPhone,
        billingSecondaryPhone: this.patientContactFormGroup.value.contactSecondaryPhone,
        billingPartyOther: "",
      })
    }
    else if (this.patientBillingFormGroup.value.billingParty == "Other") {
      this.billingfiles = [];
      this.billingfileUrl = "";
      //this.patientBillingFormGroup.reset();
      this.patientBillingFormGroup.patchValue({
        billingParty: billingstatus,
        billingFirstName: "",
        billingMiddleName: "",
        billingLastName: "",
        billingAddressLine: "",
        billingAddressLine1: "",
        billingAddressCity: "",
        billingAddressState: "",
        billingAddressZip: "",
        billingDOB: "",
        billingSSN: "",
        billingPrimaryPhone: "",
        billingSecondaryPhone: ""
      })
      this.isbillingEdit = false;
      this.disbiilingothers = false;
    }
    else {
      this.billingfiles = [];
      this.billingfileUrl = "";
      this.patientBillingFormGroup.reset();
      this.patientBillingFormGroup.patchValue({
        billingParty: billingstatus,
        billingFirstName: "",
        billingMiddleName: "",
        billingLastName: "",
        billingAddressLine: "",
        billingAddressLine1: "",
        billingAddressCity: "",
        billingAddressState: "",
        billingAddressZip: "",
        billingDOB: "",
        billingSSN: "",
        billingPrimaryPhone: "",
        billingSecondaryPhone: "",
        billingPartyOther: "",
      })
      this.isbillingEdit = false;

    }
  }
  checkmartialstatus() {
    let socialMaritalStatus = this.patientSocial1FormGroup.value.socialMaritalStatus;

    this.patientSocial2FormGroup.reset();
    this.patientSocial3FormGroup.reset();
    this.patientSocial2FormGroup.patchValue({
      socialGuardianFirstName: "",
      socialGuardianLastName: "",
      socialAddressLine: "",
      socialAddressCity: "",
      socialAddressState: "",
      socialAddressZip: "",
    })
    this.patientSocial3FormGroup.patchValue({
      socialDOB: "",
      socialGuardianSSN: "",
      socialPhoneNumber: ""
    })
    this.disothers = true;
    if (this.patientSocial1FormGroup.value.socialMaritalStatus == "Single") {
      this.patientagecal();

      this.patientSocial1FormGroup.patchValue({
        socialMaritalStatusOther: ""
      })

    } else if (this.patientSocial1FormGroup.value.socialMaritalStatus == "Other") {
      this.minorchkStatus = false;
      this.minorStatus = false;
      this.disothers = false;
    }
    else {
      this.minorchkStatus = false;
      this.minorStatus = false;
      this.patientSocial1FormGroup.patchValue({
        socialMaritalStatusOther: ""
      })
    }
  }
  private patientagecal() {
    if (this.patientFormGroup.value.dob != "") {
      var today = new Date();
      var birthDate = new Date(this.patientFormGroup.value.dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.minorchkStatus = true;
        this.gurdgetToday();
      }
      else {
        this.minorchkStatus = false;
      }
    }
  }

  validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(this.patientContactFormGroup.value.contactEmail)) {
      return;
    }
    this.toastr.errorToastr("You have entered an invalid email address!", 'Error!');
    this.patientContactFormGroup.patchValue({
      contactEmail: ""
    })
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  gurdgetToday(): string {
    //   if(this.patientFormGroup.value.dob==""){
    //         return new Date().toISOString().split('T')[0]
    //   }
    //   else{
    //    let now = new Date(this.patientFormGroup.value.dob);
    //     let year =now.getFullYear();
    //    let month = String(now.getMonth() + 1).padStart(2, '0');;
    //     let day = String(now.getDate()).padStart(2, '0');
    //  let minDate = String(year - 18 + "-" + month + "-" + day);
    //  return minDate;
    return new Date().toISOString().split('T')[0]
    // }
  }
  minorMandatoryValidation(): boolean {
    let flag = false;
    if (this.patientSocial2FormGroup.value.socialGuardianFirstName == "") {
      this.toastr.errorToastr("Guardian First Name Requried..", 'Error!');
      flag = true;
    }
    else if (this.patientSocial2FormGroup.value.socialGuardianLastName == "") {
      this.toastr.errorToastr("Guardian Last Name Requried..", 'Error!');
      flag = true;
    }
    else if (this.patientSocial2FormGroup.value.socialAddressLine == "") {
      this.toastr.errorToastr("Guardian Mailing Address Requried..", 'Error!');
      flag = true;
    }
    else if (this.patientSocial2FormGroup.value.socialAddressCity == "") {
      this.toastr.errorToastr("Guardian City Requried..", 'Error!');
      flag = true;
    }
    else if (this.patientSocial2FormGroup.value.socialAddressState == "") {
      this.toastr.errorToastr("Guardian State Requried..", 'Error!');
      flag = true;
    }
    else if (this.patientSocial2FormGroup.value.socialAddressZip == "") {
      this.toastr.errorToastr("Guardian Zip Requried..", 'Error!');
      flag = true;
    }
    else if (this.patientSocial3FormGroup.value.socialDOB == "") {
      this.toastr.errorToastr("Guardian DOB Requried..", 'Error!');
      flag = true;
    }
    else if (this.patientSocial3FormGroup.value.socialGuardianSSN == "") {
      this.toastr.errorToastr("Guardian Social Seccurity# Requried..", 'Error!');
      flag = true;
    }
    else if (this.patientSocial3FormGroup.value.socialPhoneNumber == "") {
      this.toastr.errorToastr("Guardian Phone Number# Requried..", 'Error!');
      flag = true;
    }
    return flag;
  }
  finish() {
    if (!this.validatePatient()) {
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
      if (this.patientFormGroup.value.socialPatientSSN == "") {
        this.toastr.errorToastr("Social Seccurity# Requried..", 'Error!');
        return;
      }
      if (!this.dobValidation()) {
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
      if (this.patientSocial4FormGroup.value.socialCommMode == "2120") {
        if (this.patientContactFormGroup.value.contactEmail == "") {
          this.toastr.errorToastr("Email Requried..", 'Error!');
          return;
        }
      }
      // if (this.patientContactFormGroup.value.contactEmail == "") {
      //   this.toastr.errorToastr("Email Requried..", 'Error!');
      //   return;
      // }
      if (this.patientContactFormGroup.value.contactAddressLine == "") {
        this.toastr.errorToastr("Street1 Requried..", 'Error!');
        return;
      }
      // if (this.patientContactFormGroup.value.contactAddressLine1 == "") {
      //   this.toastr.errorToastr("Street2 Requried..", 'Error!');
      //   return;
      // }
      if (this.patientContactFormGroup.value.contactAddressCity == "") {
        this.toastr.errorToastr("City Requried..", 'Error!');
        return;
      }
      if (this.patientContactFormGroup.value.contactAddressState == "") {
        this.toastr.errorToastr("State Requried..", 'Error!');
        return;
      }
      if (this.patientSocial1FormGroup.value.socialMaritalStatus == "") {
        this.toastr.errorToastr("Select Marital Status:", 'Error!');
        return;
      }
      var today = new Date();
      var birthDate = new Date(this.patientFormGroup.value.dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18 && this.minorMandatoryValidation()) {
        return;
      }
      if (!this.minorDobValidation()) {
        return;
      }
      
      if (this.patientSocial4FormGroup.value.socialRace == "") {
        this.toastr.errorToastr("Race Requried..", 'Error!');
        return;
      }
      if (this.patientSocial4FormGroup.value.socialEthicity == "") {
        this.toastr.errorToastr("Ethicity Requried..", 'Error!');
        return;
      }
      if (this.patientSocial4FormGroup.value.socialLanguage == "") {
        this.toastr.errorToastr("Preferred Language Requried..", 'Error!');
        return;
      }

      if (this.patientSocial4FormGroup.value.socialCommMode == "") {
        this.toastr.errorToastr("Preferred mode of communication Requried..", 'Error!');
        return;
      }


      if (this.patientBillingFormGroup.value.billingParty == "") {
        this.toastr.errorToastr("Responsible Party for Billing Requried..", 'Error!');
        return;
      }

      if (this.patientBillingFormGroup.value.billingParty == "Spouse" || this.patientBillingFormGroup.value.billingParty == "Parent") {
        if (this.patientBillingFormGroup.value.billingFirstName == "") {
          this.toastr.errorToastr("Billing First Name Requried..", 'Error!');
          return;
        }
        else if (this.patientBillingFormGroup.value.billingLastName == "") {
          this.toastr.errorToastr("Billing Last Name Requried..", 'Error!');
          return;
        }
        else if (this.patientBillingFormGroup.value.billingAddressLine == "") {
          this.toastr.errorToastr("Billing Street1 Requried..", 'Error!');
          return;
        }

        else if (this.patientBillingFormGroup.value.billingAddressCity == "") {
          this.toastr.errorToastr("Billing City Requried..", 'Error!');
          return;
        }
        else if (this.patientBillingFormGroup.value.billingAddressState == "") {
          this.toastr.errorToastr("Billing State Requried..", 'Error!');
          return;
        }
        else if (this.patientBillingFormGroup.value.billingDOB == "") {
          this.toastr.errorToastr("Billing DOB Requried..", 'Error!');
          return;
        }
        else if (this.patientBillingFormGroup.value.billingSSN == "") {
          this.toastr.errorToastr("Billing Social Seccurity# Requried..", 'Error!');
          return;
        }
        else if (this.patientBillingFormGroup.value.billingPrimaryPhone == "") {
          this.toastr.errorToastr("Billing Primary Phone Requried..", 'Error!');
          return;
        }
      }
      if (this.patientBillingFormGroup.value.billingDOB != "" && !this.billingDobValidation()) {
        return;
      }
      this.ClsCreateUpdatePatient.sPatientDetails = this.getPatient();
      this.ClsCreateUpdatePatient.sPatientEmpContact = this.getEmployerContact();
      this.ClsCreateUpdatePatient.sPatientEmergency = this.getPatientEmergency();
      
      this.ClsCreateUpdatePatient.sPatientSocial = this.getPatientSocial();
      this.ClsCreateUpdatePatient.sPatientBilling = this.getPatientBilling();
      this.ClsCreateUpdatePatient.sPatientInsurance = this.getPatientInsurance();
      this.ClsCreateUpdatePatient.sPatientAuthorisation = this.getPatientAuthorization();


      if (this.ClsCreateUpdatePatient.sPatientInsurance.length === 0) {
        this.toastr.errorToastr('Please Add Insurance!', 'Error!');
        return;
      }

      //other Info

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
      // As per the UAT testing client want to remove this validation.

      // if (this.ClsAllergyImmunization.allergies.length === 0) {
      //   this.toastr.errorToastr('Add Allergies', 'Oops!');
      //   return;
      // }
      // if (this.ClsAllergyImmunization.socials.length === 0) {
      //   this.toastr.errorToastr('Add MEDICATION', 'Oops!');
      //   return;
      // }
      if (this.ClsAllergyImmunization.families.length === 0) {
        this.toastr.errorToastr('Add Family', 'Oops!');
        return;
      }
      //other Info

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
      
      //other Info
      this.formData.append('allergyImmunization', JSON.stringify(this.ClsAllergyImmunization));
      //other Info
      this.patientCreateService.savePatient(this.formData)
        .subscribe
        (
          res => {
            
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
            //this.router.navigate(['/patient-others']);
            this.router.navigate(['/patient-search'], { queryParams: { mode: "edit-patient" } });
          },
          err => {
            this.toastr.errorToastr('please contact system admin!', 'Error!');
            this.formData = new FormData();
            
          }
        );
    }
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
      socialMaritalStatusOther: this.patientSocial1FormGroup.value.socialMaritalStatusOther,
      guardianFName: this.patientSocial2FormGroup.value.socialGuardianFirstName,
      guardianLName: this.patientSocial2FormGroup.value.socialGuardianLastName,
      addLine: this.patientSocial2FormGroup.value.socialAddressLine,
      addCity: this.patientSocial2FormGroup.value.socialAddressCity,
      addState: this.patientSocial2FormGroup.value.socialAddressState,
      addZip: this.patientSocial2FormGroup.value.socialAddressZip,
      dob: this.patientSocial3FormGroup.value.socialDOB,
      patientSSN: this.patientFormGroup.value.socialPatientSSN,
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
    this.isbillingEdit = (this.patientBillingFormGroup.value.billingParty == "Spouse" || this.patientBillingFormGroup.value.billingParty == "Parent") ? true : false;
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
      billingPartyOther: this.patientBillingFormGroup.value.billingPartyOther,
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
    debugger;
    this.patientCreateService.getPatientInfoByPatientId(patientId)
      .subscribe
      (
        res => {
          
          this.patientId = res.sPatientDetails.patientId;
          if (res.sPatientDetails.imagePath !== '') {
            this.patientimage = res.sPatientDetails.imagePath;
          }
          this.setPatient(res.sPatientDetails,res.sPatientSocial);
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
          
        }
      );
  }

  setPatient(sPatientDetails,sPatientSocial) {
    this.patientId = sPatientDetails.patientId;
    this.patientFormGroup.patchValue({
      firstName: sPatientDetails.firstName,
      middleName: sPatientDetails.middleName,
      lastName: sPatientDetails.lastName,
      dob: sPatientDetails.dob,
      gender: sPatientDetails.gender,
      socialPatientSSN:sPatientSocial!=null &&  sPatientSocial.patientSSN!=null ?sPatientSocial.patientSSN:"",
    });
    // this.patientagecal();
    this.patientContactFormGroup.patchValue({
      contactAddressLine: sPatientDetails.addressLine,
      contactAddressLine1: sPatientDetails.addressLine1,
      contactAddressCity: sPatientDetails.addressCity,
      contactAddressState: sPatientDetails.addressState,
      contactAddressPostalCode: sPatientDetails.addressPostalCode,
      contactEmail: sPatientDetails.email,
      contactActive: sPatientDetails.flag == "N" ? "Y" : sPatientDetails.flag,
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
      socialMaritalStatus: sPatientSocial.maritalStatus,
      socialMaritalStatusOther: sPatientSocial.socialMaritalStatusOther
    });

    this.checkmartialstatus();
    if (sPatientSocial.guardianFName != "") {
      this.minorStatus = true;
    }
    this.patientSocial2FormGroup.patchValue({
      socialGuardianFirstName: sPatientSocial.guardianFName,
      socialGuardianLastName: sPatientSocial.guardianLName,
      // socialDOB: sPatientSocial.DOB,
      socialAddressLine: sPatientSocial.addLine,
      socialAddressCity: sPatientSocial.addCity,
      socialAddressState: sPatientSocial.addState,
      socialAddressZip: sPatientSocial.addZip
    });
    this.patientSocial3FormGroup.patchValue({
      socialDOB: this.patientSocial1FormGroup.value.socialMaritalStatus == "Single" && this.patientSocial2FormGroup.value.socialGuardianFirstName != "" ? sPatientSocial.DOB : "",
      socialPhoneNumber: sPatientSocial.phoneNumber,
      socialGuardianSSN: sPatientSocial.guardianSSN
    });


    /* display image --start */
    this.socialIsEdit = true;
    this.socialfileUrl = sPatientSocial.driversLicenseFilePath;
    /* display image --end */
    this.patientSocial4FormGroup.patchValue({
      
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

    /* added for image binding --end */
    this.patientBillingFormGroup.patchValue({
      billingParty: sPatientBilling.billingParty
    });
    this.checkbillingstatus();
    this.billingfileUrl = sPatientBilling.driversLicenseFilePath;
    this.patientBillingFormGroup.patchValue({
      billingParty: sPatientBilling.billingParty,
      billingFirstName: sPatientBilling.firstName,
      billingMiddleName: sPatientBilling.middleName,
      billingLastName: sPatientBilling.lastName,
      billingDOB: (this.patientBillingFormGroup.value.billingParty == "Self" ||
        this.patientBillingFormGroup.value.billingParty == "Spouse" || this.patientBillingFormGroup.value.billingParty == "Parent")
        ? sPatientBilling.dob : "",
      billingAddressLine: sPatientBilling.addLine,
      billingAddressLine1: sPatientBilling.addLine1,
      billingAddressCity: sPatientBilling.addCity,
      billingAddressState: sPatientBilling.addState,
      billingAddressZip: sPatientBilling.addZip,
      billingSSN: sPatientBilling.SSN,
      billingPrimaryPhone: sPatientBilling.primaryPhone,
      billingSecondaryPhone: sPatientBilling.secondaryPhone,
      billingPartyOther: sPatientBilling.billingPartyOther
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
            case '8':
              this.alertKeywordArray = res;
              break;
            case '11':
              this.allergiesArray = res;
              break;
            case '12':
              this.iMMUNIZATIONSArray = res;
              break;
          }
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          
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
    const phoneNumber = this.formatphone(this.patientSocial3FormGroup.value.socialPhoneNumber, 'Guardian Phone');
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
        
        self.url = event.target.result;
      };
    }
  }


  dobValidation(): boolean {
    let flgdate = true;
    
    if (new Date(this.patientFormGroup.value.dob) < new Date(this.minDate)) {
      this.toastr.errorToastr('Invalid DOB ' + this.patientFormGroup.value.dob + '', 'Oops!');
      flgdate = false;
    }
    else if (new Date(this.patientFormGroup.value.dob) > new Date(this.getToday())) {
      this.toastr.errorToastr('Invalid DOB ' + this.patientFormGroup.value.dob + '', 'Oops!');
      flgdate = false;
    }
    return flgdate;
  }
  minorDobValidation(): boolean {
    let flgdate = true;

    if (new Date(this.patientSocial3FormGroup.value.socialDOB) < new Date(this.minDate)) {
      this.toastr.errorToastr('Guardian: Invalid DOB ' + this.patientSocial3FormGroup.value.dob + '', 'Oops!');
      flgdate = false;
    }
    else if (new Date(this.patientSocial3FormGroup.value.socialDOB) > new Date(this.getToday())) {
      this.toastr.errorToastr('Guardian: Invalid DOB ' + this.patientSocial3FormGroup.value.dob + '', 'Oops!');
      flgdate = false;
    }
    return flgdate;
  }

  billingDobValidation(): boolean {
    let flgdate = true;

    if (new Date(this.patientBillingFormGroup.value.billingDOB) < new Date(this.minDate)) {
      this.toastr.errorToastr('Billing: Invalid DOB ' + this.patientBillingFormGroup.value.billingDOB + '', 'Oops!');
      flgdate = false;
    }
    else if (new Date(this.patientBillingFormGroup.value.billingDOB) > new Date(this.getToday())) {
      this.toastr.errorToastr('Billing: Invalid DOB ' + this.patientBillingFormGroup.value.billingDOB + '', 'Oops!');
      flgdate = false;
    }
    return flgdate;
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode != 45 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;


  }
  alpha(event: any) {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (!((charCode == 8) || (charCode == 9) || (charCode == 32) || (charCode == 46) || (charCode >= 35 && charCode <= 40) || (charCode >= 65 && charCode <= 90))) {
      event.preventDefault();
    }
    //return true;


  }
  lencheck() {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.patientContactFormGroup.value.contactAddressPostalCode);
    if (!isValidZip) {
      this.toastr.errorToastr('Invalid Zip.Zip Format must be 00000-xxxx', 'Oops!');
      this.patientContactFormGroup.patchValue({
        contactAddressPostalCode: ""
      });
    }

  }
  socialpostallencheck() {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.patientSocial2FormGroup.value.socialAddressZip);
    if (!isValidZip) {
      this.toastr.errorToastr('Invalid Zip.Zip Format must be 00000-xxxx', 'Oops!');
      this.patientSocial2FormGroup.patchValue({
        socialAddressZip: ""
      });
    }

  }
  billingpostallencheck() {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.patientBillingFormGroup.value.billingAddressZip);
    if (!isValidZip) {
      this.toastr.errorToastr('Invalid Zip.Zip Format must be 00000-xxxx', 'Oops!');
      this.patientBillingFormGroup.patchValue({
        billingAddressZip: ""
      });
    }

  }
  socialssnlencheck() {
    let ssno=this.patientFormGroup.value.socialPatientSSN.split('-').join('');
    if (ssno.length == 9) {
      let newVal = this.ssnformat(ssno);
      this.patientFormGroup.patchValue({
        socialPatientSSN: newVal
      });
    } else {
      this.toastr.errorToastr('Social SSN 9 digit requried', 'Oops!');
      this.patientFormGroup.patchValue({
        socialPatientSSN: ""
      });
    }
  }
  minorssnlencheck() {
    let ssno=this.patientSocial3FormGroup.value.socialGuardianSSN.split('-').join('');
    if (ssno.length == 9) {
      let newVal = this.ssnformat(ssno);
      this.patientSocial3FormGroup.patchValue({
        socialGuardianSSN: newVal
      });
    } else {
      this.toastr.errorToastr('Guardian SSN 9 digit requried', 'Oops!');
      this.patientSocial3FormGroup.patchValue({
        socialGuardianSSN: ""
      });
    }
  }
  ssnformat(value: string): string {
    var val = value.replace(/\D/g, '');
    var newVal = '';

    if (val.length > 4) {
      value = val;
    }

    if ((val.length > 3) && (val.length < 6)) {
      newVal += val.substr(0, 3) + '-';
      val = val.substr(3);
    }

    if (val.length > 5) {
      newVal += val.substr(0, 3) + '-';
      newVal += val.substr(3, 2) + '-';
      val = val.substr(5);
    }

    newVal += val;
    return newVal;
  }
  billingssnlencheck() {
    let ssno=this.patientBillingFormGroup.value.billingSSN.split('-').join('');
    if (ssno.length == 9) {
      let newVal = this.ssnformat(ssno);
      this.patientBillingFormGroup.patchValue({
        billingSSN: newVal
      });
    } else {
      this.toastr.errorToastr('Billing SSN 9 digit requried', 'Oops!');
      this.patientBillingFormGroup.patchValue({
        billingSSN: ""
      });
    }

  }
  // Other Info
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
    if (this.allergiesFormGroup.value['allergiesCode'] == "") {
      this.toastr.errorToastr('Select Allergies', 'Oops!');
      return;
    }
    let obj = this.allergiesArray.filter((x: any) => x.id == this.allergiesFormGroup.value['allergiesCode'])[0];
    if (this.allergyArray.filter((x: any) => x.code == obj.name.split("~")[0] && x.description == obj.name.split("~")[1]).length > 0) {
      this.toastr.errorToastr('Allergies already added', 'Oops!');
      return;
    }
    const alergy: Allergies = {
      id: '0',
      patientId: this.patientId,
      code: obj.name.split("~")[0],
      description: obj.name.split("~")[1]
    };
    this.allergyArray.push(alergy);
    this.allergiesFormGroup.reset();
    this.allergiesFormGroup.patchValue({
      allergiesCode: ""
    });
  }
  deleteallergyRow(index) {
    this.allergyArray.splice(index, 1);
  }

  addSocials() {
    if (this.socialFormGroup.value['socialAddiection'] == "") {
      this.toastr.errorToastr('Medicine Requried', 'Oops!');
      return;
    }
    else if (this.socialFormGroup.value['socialFrequency'] == "") {
      this.toastr.errorToastr('Dosage Requried', 'Oops!');
      return;
    }
    else if (this.socialFormGroup.value['socialDuration'] == "") {
      this.toastr.errorToastr('Year Requried', 'Oops!');
      return;
    }
    if (this.socailArray.filter((x: any) => x.addiection == this.socialFormGroup.value['socialAddiection']
      && x.frequency == this.socialFormGroup.value['socialFrequency']).length > 0) {
      this.toastr.errorToastr('Medicine already added', 'Oops!');
    }
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
    if (this.familyFormGroup.value['familyMember'] == "") {
      this.toastr.errorToastr('Relation Requried', 'Oops!');
      return;
    }
    else if (this.familyFormGroup.value['familyDiseases'] == "") {
      this.toastr.errorToastr('Diseases Requried', 'Oops!');
      return;
    }
    let obj = this.relationshipWithPatient.filter((x: any) => x.id == this.familyFormGroup.value['familyMember'])[0];
    if (this.familyArray.filter((x: any) => x.member == obj.name && x.diseases == this.familyFormGroup.value['familyDiseases']).length > 0) {
      this.toastr.errorToastr('Family diseases already added', 'Oops!');
      return;
    }
    const family: Families = {
      id: '0',
      patientId: this.patientId,
      member: obj.name,
      diseases: this.familyFormGroup.value['familyDiseases']
    };
    this.familyArray.push(family);
    this.familyFormGroup.reset();
    this.familyFormGroup.patchValue({
      familyDiseases: "",
      familyMember: ""
    });
  }
  deleteFamilyRow(index) {
    this.familyArray.splice(index, 1);
  }



  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container.store.dispatch(container.actions.select(event.date));
    };
    container.setViewMode('year');
  }
  addImmunizations() {
    if (this.immunizationsFormGroup.value['immunizationsDate'] == "") {
      this.toastr.errorToastr('Immunizations Date Requried', 'Oops!');
      return;
    }
    else if (this.immunizationsFormGroup.value['immunizationsCode'] == "") {
      this.toastr.errorToastr('Select Immunizations', 'Oops!');
      return;
    }
    if (!this.immunizationdateValidation()) {
      return;
    }
    let obj = this.iMMUNIZATIONSArray.filter((x: any) => x.id == this.immunizationsFormGroup.value['immunizationsCode'])[0];


    if (this.immunizationArray.filter((x: any) => x.code == obj.name.split("~")[0] && x.description == obj.name.split("~")[1]).length > 0) {
      this.toastr.errorToastr('IMMUNIZATIONS already added', 'Oops!');
      return;
    }
    const immunization: Immunizations = {
      id: '0',
      patientId: this.patientId,
      // tslint:disable-next-line: max-line-length
      date: this.immunizationsFormGroup.value['immunizationsDate'].substring(5, 7) + '-' + this.immunizationsFormGroup.value['immunizationsDate'].substring(8, 10) +
        '-' + this.immunizationsFormGroup.value['immunizationsDate'].substring(0, 4),
      // code: this.immunizationsFormGroup.value['immunizationsCode'],
      // description: this.immunizationsFormGroup.value['immunizationsDescription']
      code: obj.name.split("~")[0],
      description: obj.name.split("~")[1]
    };
    this.immunizationArray.push(immunization);
    this.immunizationsFormGroup.reset();
    this.immunizationsFormGroup.patchValue({
      immunizationsCode: "",
      immunizationsDate: ""
    });
  }
  deleteImmunizationRow(index) {
    this.immunizationArray.splice(index, 1);
  }
  immunizationdateValidation(): boolean {
    let flgdate = true;

    if (new Date(this.immunizationsFormGroup.value.immunizationsDate) < new Date(this.minDate)) {
      this.toastr.errorToastr('Invalid Year ' + this.immunizationsFormGroup.value.dob + '', 'Oops!');
      flgdate = false;
    }
    else if (new Date(this.immunizationsFormGroup.value.immunizationsDate) > new Date(this.getToday())) {
      this.toastr.errorToastr('Invalid Year ' + this.immunizationsFormGroup.value.dob + '', 'Oops!');
      flgdate = false;
    }
    return flgdate;
  }
  handler(e: any) {

    this.patientSocial2FormGroup.patchValue({
      socialGuardianFirstName: "",
      socialGuardianLastName: "",
      socialAddressLine: "",
      socialAddressCity: "",
      socialAddressState: "",
      socialAddressZip: "",
    })
    this.patientSocial3FormGroup.patchValue({
      socialDOB: "",
      socialGuardianSSN: "",
      socialPhoneNumber: ""
    })
    if (this.patientSocial1FormGroup.value.socialMaritalStatus == "Single") {
      this.patientSocial1FormGroup.patchValue({
        socialMaritalStatus: ""
      })
    }
    this.minorchkStatus = false;
    this.minorStatus = false;
  }
  blnfinsh = false;
  validatePatient(): boolean {
    this.patientValidate.patientId = this.patientId;
    this.patientValidate.dob = this.patientFormGroup.value['dob'];
    this.patientValidate.gender = this.patientFormGroup.value['gender'];
    this.patientValidate.patientfName = this.patientFormGroup.value['firstName'];
    this.patientValidate.patientlName = this.patientFormGroup.value['lastName'];
    this.patientValidate.patientmName = this.patientFormGroup.value['middleName'];
    this.patientValidate.ssn = this.patientFormGroup.value['socialPatientSSN'];
    this.patientCreateService.patientValidation(this.patientValidate).subscribe((res) => {
      if (res == '1') {
        this.toastr.errorToastr('Duplicate Entry. Please verify the input First Name, Last Name, SSN, DOB and Gender and try again...');
        this.blnfinsh = true;
        return true;
      }
      else if (res == '-1') {
        this.toastr.errorToastr('Duplicate SSN. Please verify SSN and try again...')
        this.blnfinsh = true;
        return true;
      }
      else {
        this.blnfinsh = false;
        return false;
      }
    });
    return false;
  }
  //Other Info
}
