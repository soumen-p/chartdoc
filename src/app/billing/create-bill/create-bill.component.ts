import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CreateBillService } from '../../services/create-bill.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
  formData = new FormData();
  @ViewChild('formDir', { static: false }) private formDirective: NgForm;
  createbillForm: FormGroup;
  references: any;
  services: any;
  subtitle: string = "";
  today = new Date();
  minDate = undefined;
  chargePatientDetails: any;
  grandtotal: any = 0;
  appointmentId: any = 0;
  pipe = new DatePipe('en-US');
  tableId: number = 0;
  showcreatechage: boolean = false;
  showcreateclaim: boolean = false;
  arrayCPTCriteria: any;
  searchCriteria: string = "";
  icdparam: number = 1;
  divclass = "form-group col-md-4";
  heading: string = "";
  reasons: [] = [];
  changedModes :[] =[];
  serviceID:number=0;
  refID:number=0;
  fileAsID:number=0;
  places: [] = [];
  locations: [] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _avRoute: ActivatedRoute,
    public toastr: ToastrManager,
    public createBillService: CreateBillService
  ) {
    const current = new Date();
    this.minDate = current;
    if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == -1) {
      this.tableId = 1;
    } else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 1) {
      this.tableId = 2;
    }else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 2) {
      this.tableId = 3;
    }
    else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 3) {
      this.tableId = 4;
    }
    this.createbillForm = this.formBuilder.group({
      date1: [''],
      date: [''],
      patientName: [''],
      patientId: ['0'],
      feeTicketNo: [''],
      appointmentId: ['0'],
      claimBalance: ['0'],
      patientBalance: ['0'],
      statusId: ['0'],
      status: [''],
      chargeId: ['0'],
      modeOfTransaction: [''],
      doctorName: [''],
      doctorId: ['0'],
      insuranceId1: ['0'],
      insuranceName1: [''],
      policy1: [''],
      insuranceId2: ['0'],
      insuranceName2: [''],
      policy2: [''],
      insuranceId3: ['0'],
      insuranceName3: [''],
      policy3: [''],
      locationId: ['0', [Validators.required]],
      locationName: [''],
      placeOfId: ['0' ,[Validators.required]],
      placeOfName: [''],
      serviceId: ['0', [Validators.required]],
      serviceName: [''],
      referenceId: ['0', [Validators.required]],
      referenceName: [''],
      fileAsId: ['0', [Validators.required]],
      fileAsName: [''],
      reasonId: ['0'],
      paidAmount: ['0'],
      claimstatusId:this.tableId==4 ? ['0'] :[this.tableId],
      typeEM:['']
    });
    if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == -1) {

      this.appointmentId = this._avRoute.snapshot.queryParams["appid"];
      this.subtitle = 'CREATE CHARGE';
    
      this.showcreatechage = true;
      this.heading = "Billing";
    }
    else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 1) {

      this.appointmentId = this._avRoute.snapshot.queryParams["appid"];
      this.subtitle = 'CREATE CLAIM';
      this.tableId = 2;
      this.showcreateclaim = true;
      this.heading = "Billing";
      this.createbillForm.controls['insuranceName1']!.disable();
      this.createbillForm.controls['insuranceName2']!.disable();
      this.createbillForm.controls['insuranceName3']!.disable();
      this.createbillForm.controls['locationId']!.disable();
      this.createbillForm.controls['placeOfId']!.disable();
      this.createbillForm.controls['serviceId']!.disable();
      this.createbillForm.controls['referenceId']!.disable();
      this.createbillForm.controls['fileAsId']!.disable();

    }
    else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 2) {

      this.appointmentId = this._avRoute.snapshot.queryParams["appid"];
      this.subtitle = 'RESUBMIT CLAIM';
      this.tableId = 3;
      this.showcreatechage = true;
      this.divclass = "form-group col-md-3";
      this.heading = "Billing";

    }
    else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 3) {

      this.appointmentId = this._avRoute.snapshot.queryParams["appid"];
      this.subtitle = 'MANAGE CLAIM';
      this.tableId = 4;
      this.showcreateclaim = true;
      this.heading = "Billing";
      this.getClaimStatus();
      this.createbillForm.controls['insuranceName1']!.disable();
      this.createbillForm.controls['insuranceName2']!.disable();
      this.createbillForm.controls['insuranceName3']!.disable();
      this.createbillForm.controls['locationId']!.disable();
      this.createbillForm.controls['placeOfId']!.disable();
      this.createbillForm.controls['serviceId']!.disable();
      this.createbillForm.controls['referenceId']!.disable();
      this.createbillForm.controls['fileAsId']!.disable();
    }
  }

  ngOnInit() {
    this.getServiceDetails();
    this.getDoctorList();
    this.getChargePatientHeader();
    this.getChargePatientDetails();
    this.getReason(5);
    this.getMasterData('13');
    this.getMasterData('14');
  }
  getServiceDetails() {
    let self = this;
    this.createBillService.getServiceDetails()
      .subscribe((res) => {
        this.services = res;
      })
  };
  getReason(param: any) {
    this.createBillService.getReason(param)
      .subscribe((res) => {
        this.reasons = res;

      }, err => {
        console.log(err);
      });
  }
  getClaimStatus() {
    this.createBillService.getClaimStatus()
      .subscribe((res) => {
        this.changedModes = res;

      }, err => {
        console.log(err);
      });
  }
  getDoctorList() {
    let self = this;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const strdate = `${mm}${dd}${yyyy}`;
    this.createBillService.getDoctorList(strdate)
      .subscribe((res) => {
        this.references = res;
      })
  };
  getChargePatientDetails() {
    if("claimDetails" in localStorage && "acceptcopay" in localStorage){
      if(JSON.parse(localStorage.getItem("acceptcopay"))=="Yes"){
        this.chargePatientDetails =JSON.parse(localStorage.getItem("claimDetails"));
        let coPayAmt=JSON.parse(localStorage.getItem("acceptcoamt"));
        if(Number(coPayAmt)>0){
          this.chargePatientDetails[0].copay=coPayAmt;
        }
        localStorage.removeItem("claimDetails");
      }
   } 
    else{
    this.createBillService.getChargePatientDetails(this.appointmentId)
      .subscribe((res) => {
        this.chargePatientDetails = res;

        if (this.chargePatientDetails != null && this.chargePatientDetails.length > 0) {
          this.chargePatientDetails.forEach(x => this.grandtotal += x.chargeAmount);
        }
        
      });
    }
  }
  getChargePatientHeader() {
   
    this.createBillService.getChargePatientHeader(this.appointmentId)
      .subscribe((res) => {
        this.serviceID=res.serviceId;
        this.refID=res.referenceId;
        this.fileAsID=res.fileAsId;
        let claimHeader:any;
        
       
        this.createbillForm.patchValue({
          date1:this.pipe.transform(new Date(res.date), 'dd/MM/yyyy'),
          date: this.pipe.transform(new Date(res.date), 'MM-dd-yyyy'),
          patientName: res.patientName,
          patientId: res.patientId,
          feeTicketNo: res.feeTicketNo,
          appointmentId: res.appointmentId,
          claimBalance: res.claimBalance,
          patientBalance: res.patientBalance,
          statusId: res.statusId,
          status: res.status,
          chargeId: res.chargeId,
          modeOfTransaction: res.modeOfTransaction,
          doctorName: res.doctorName,
          doctorId: res.doctorId,
          insuranceId1: res.insuranceId1,
          insuranceName1: res.insuranceName1,
          insuranceId2: res.insuranceId2,
          insuranceName2: res.insuranceName2,
          insuranceId3: res.insuranceId3,
          insuranceName3: res.insuranceName3,
          locationId: res.locationId,
          locationName: res.locationName,
          placeOfId: res.placeOfId,
          placeOfName: res.placeOfName,
          serviceId: res.serviceId,
          serviceName: res.serviceName,
          referenceId: res.referenceId,
          referenceName: res.referenceName,
          fileAsId: res.fileAsId,
          fileAsName: res.fileAsName,
          reasonId: res.reasonId,
          policy1:res.policy1=="-1"?'':res.policy1,
          policy2:res.policy2=="-1"?'':res.policy2,
          policy3:res.policy3=="-1"?'':res.policy3,
          typeEM:res.typeEM

        })
        if("claimHeader" in localStorage){
          claimHeader= JSON.parse(localStorage.getItem("claimHeader"));
          localStorage.removeItem("claimHeader");
          this.createbillForm.patchValue({
            insuranceId1: claimHeader.insuranceId1,
            insuranceName1: claimHeader.insuranceName1,
            insuranceId2: claimHeader.insuranceId2,
            insuranceName2: claimHeader.insuranceName2,
            insuranceId3: claimHeader.insuranceId3,
            insuranceName3: claimHeader.insuranceName3,
            locationId: claimHeader.locationId,
            locationName: claimHeader.locationName,
            placeOfId: claimHeader.placeOfId,
            placeOfName: claimHeader.placeOfName,
            serviceId: claimHeader.serviceId,
            serviceName: claimHeader.serviceName,
            referenceId: claimHeader.referenceId,
            referenceName: claimHeader.referenceName,
            fileAsId: claimHeader.fileAsId,
            fileAsName: claimHeader.fileAsName,
            reasonId: res.reasonId,
            policy1:res.policy1=="-1"?'':res.policy1,
            policy2:res.policy2=="-1"?'':res.policy2,
            policy3:res.policy3=="-1"?'':res.policy3,
            typeEM:res.typeEM
          })
       } 
        
      })
  }
  acceptcopay() {
    localStorage.removeItem("acceptcopay");
    localStorage.removeItem("acceptcoamt");
    localStorage.setItem("claimHeader",  JSON.stringify(this.createbillForm.value));
    localStorage.setItem("claimDetails", JSON.stringify(this.chargePatientDetails));
    this.createBillService.setBookingInfo("CopayAppId", this.createbillForm.value.appointmentId);
    this.router.navigate(['/accept-copay'], { queryParams: { pid: this.createbillForm.value.patientId, back: "create-bill" } });
  }
  reset(): void {
    if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == -1) {
      this.router.navigate(['/create-charge'],{queryParams:{id:-1}});
    }
    else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 1) {
      this.router.navigate(['/create-charge'],{queryParams:{id:1}});
    }
    else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 2) {
      this.router.navigate(['/create-charge'],{queryParams:{id:2}});
    }
    else if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 3) {
      this.router.navigate(['/create-charge'],{queryParams:{id:3}});
    }
    
  }
  modechange(data:any){
    console.log(data);
    this.createbillForm.patchValue({
      claimstatusId:2
    })
  }
  save() {
    if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == -1) {
      if(this.createbillForm.value.locationId=="0"){
        this.toastr.errorToastr('Location requried', 'Error!');
          return;
      }
      if(this.createbillForm.value.placeOfId=="0"){
        this.toastr.errorToastr('Place requried', 'Error!');
          return;
      }
      if(this.createbillForm.value.referenceId==""){
        this.toastr.errorToastr('Reference by requried', 'Error!');
          return;
      }
      else if(this.createbillForm.value.fileAsId=="0"){
        this.toastr.errorToastr('File As requried', 'Error!');
        return;
      }
      else if(this.chargePatientDetails[0].cptId ==""){
        this.toastr.errorToastr('CPT requried', 'Error!');
        return;
      }
     else  if(this.chargePatientDetails[0].icd1 ==""){
        this.toastr.errorToastr('Altealst Dx#1 requried', 'Error!');
        return;
      }
      else  if(this.chargePatientDetails[0].chargeAmount =="" || this.chargePatientDetails[0].chargeAmount =="0" ){
        this.toastr.errorToastr('Charge Amount requried', 'Error!');
        return;
      }
      else  if(this.chargePatientDetails[0].allowedAmount =="" || this.chargePatientDetails[0].allowedAmount =="0" ){
        this.toastr.errorToastr('Allowed Amount requried', 'Error!');
        return;
      }
      else  if( Number (this.chargePatientDetails[0].allowedAmount)> Number (this.chargePatientDetails[0].chargeAmount)){
        this.toastr.errorToastr('Allowed Amount must be equal or less than Charge Amount', 'Error!');
        return;
      }
    }
    if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == 2) {
      if(this.createbillForm.value.referenceId==""){
        this.toastr.errorToastr('Reference by requried', 'Error!');
          return;
      }
      else if(this.createbillForm.value.fileAsId==""){
        this.toastr.errorToastr('File As requried', 'Error!');
        return;
      }
      else if(this.createbillForm.value.reasonId==""){
        this.toastr.errorToastr('Rejection Reason requried', 'Error!');
        return;
      }
    }
    if (this._avRoute.snapshot.queryParams["id"] && this._avRoute.snapshot.queryParams["id"] == -1) {
      if(this.createbillForm.value.claimstatusId==""){
        this.toastr.errorToastr('Changed Mode requried', 'Error!');
          return;
      }
      
    }
    if(this.tableId == 4){
      if(this.createbillForm.value.claimstatusId=="0"){
        this.toastr.errorToastr('Select Change Mode', 'Error!');
        return;
      }
      this.createbillForm.patchValue({
        serviceId:this.serviceID,
        fileAsId:this.fileAsID,
        referenceId:  this.refID
      })
      this.createbillForm.value.referenceId=this.createbillForm.controls['referenceId'].value;
      this.createbillForm.value.serviceId=this.createbillForm.controls['serviceId'].value;
      this.createbillForm.value.fileAsId=this.createbillForm.controls['fileAsId'].value;
      this.createbillForm.value.locationId=this.createbillForm.controls['locationId'].value;
      this.createbillForm.value.placeOfId=this.createbillForm.controls['placeOfId'].value;
    }
    if(this.tableId == 2){
      this.createbillForm.patchValue({
        claimstatusId:2
      })
    }
    if (this.tableId != 2) {
     
      this.formData = new FormData();
      this.formData.append('chargeId', JSON.stringify(this.createbillForm.value.chargeId));
      this.formData.append('isDelete', JSON.stringify('N'));
      this.formData.append('claimHeader', JSON.stringify(this.createbillForm.value));
      this.formData.append('claimDetails', JSON.stringify(this.chargePatientDetails[0]));
      //this.formData.append('claimAdjustment', JSON.stringify(''));
      //console.log(this.formData);
      this.createBillService.saveClaim(this.formData)
        .subscribe
        (
          res => {
            localStorage.removeItem("claimHeader");
            localStorage.removeItem("claimDetails");
            localStorage.removeItem("acceptcopay");
            localStorage.removeItem("acceptcoamt");
            if (this.tableId == 3) {
              this.createBillService.setsubmitclaimInfo('submitclaimInfo', {
                chargeId: this.createbillForm.value.chargeId,
                patientName: this.createbillForm.value.patientName,
                mode:'U'
              });
              this.router.navigate(['/submit-claim']);
            }else{
              if(this.tableId ==1){
              this.router.navigate(['/create-claim'], { queryParams: { id: this.tableId } });
              }else if(this.tableId ==4){
                this.router.navigate(['/create-eob'], { queryParams: { id: 9} });
              }
            }
          },
          err => {
            this.toastr.errorToastr('please contact system admin!', 'Error!');
            console.log(err);
          }
        );
    } else {
      this.createBillService.setsubmitclaimInfo('submitclaimInfo', {
        chargeId: this.createbillForm.value.chargeId,
        patientName: this.createbillForm.value.patientName,
        mode:'I'
      });
      this.router.navigate(['/submit-claim']);
    }
  }
  opencptsearch() {
    document.getElementById('cptSearch').style.display = 'block';
    this.searchCriteria = "cpt";
  }
  openicdsearch(param: any) {
    document.getElementById('icdSearch').style.display = 'block';
    this.searchCriteria = "icd";
    this.icdparam = param;
  }
  public closePopupCancel(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
    if(myModal=='cptSearch'){
      this.chargePatientDetails[0].cptId ="";
      this.chargePatientDetails[0].cptCode = "";
      this.chargePatientDetails[0].cptDesc = "";
      this.chargePatientDetails[0].chargeAmount ="";
      this.grandtotal = "";
    }
    if(myModal=='icdSearch'){
      if (this.icdparam == 1) {
        this.chargePatientDetails[0].icd1 ="";
        this.chargePatientDetails[0].icdCode1 ="";
        this.chargePatientDetails[0].icdDesc1 ="";
        
      }
      else if (this.icdparam == 2) {
        this.chargePatientDetails[0].icd2 ="";
        this.chargePatientDetails[0].icdCode2 ="";
        this.chargePatientDetails[0].icdDesc2 ="";
        
      }
      else if (this.icdparam == 3) {
        this.chargePatientDetails[0].icd3 ="";
        this.chargePatientDetails[0].icdCode3 ="";
        this.chargePatientDetails[0].icdDesc3 ="";
        
      }
      else if (this.icdparam == 4) {
        this.chargePatientDetails[0].icd4 ="";
        this.chargePatientDetails[0].icdCode4 ="";
        this.chargePatientDetails[0].icdDesc4 ="";
        
      }
    }

  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode != 45 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  paste(e){
    e.preventDefault();
  }
  adddata(data: FormGroup) {

    if (this.searchCriteria == "cpt") {
      this.chargePatientDetails[0].cptId = data.value.id;
      this.chargePatientDetails[0].cptCode = data.value.code;
      this.chargePatientDetails[0].cptDesc = data.value.desc;
      this.chargePatientDetails[0].chargeAmount = data.value.chargeAmount;
      this.chargePatientDetails[0].allowedAmount = data.value.chargeAmount;
      this.grandtotal = data.value.chargeAmount;
      document.getElementById('cptSearch').style.display = 'none';
    }
    else if (this.searchCriteria == "icd") {
      document.getElementById('icdSearch').style.display = 'none';
      if (this.icdparam == 1) {
        this.chargePatientDetails[0].icd1 = data.value.id;
        this.chargePatientDetails[0].icdCode1 = data.value.code;
        this.chargePatientDetails[0].icdDesc1 = data.value.desc;
        
      }
      else if (this.icdparam == 2) {
        this.chargePatientDetails[0].icd2 = data.value.id;
        this.chargePatientDetails[0].icdCode2 = data.value.code;
        this.chargePatientDetails[0].icdDesc2 = data.value.desc;
        
      }
      else if (this.icdparam == 3) {
        this.chargePatientDetails[0].icd3 = data.value.id;
        this.chargePatientDetails[0].icdCode3 = data.value.code;
        this.chargePatientDetails[0].icdDesc3 = data.value.desc;
        
      }
      else if (this.icdparam == 4) {
        this.chargePatientDetails[0].icd4 = data.value.id;
        this.chargePatientDetails[0].icdCode4 = data.value.code;
        this.chargePatientDetails[0].icdDesc4 = data.value.desc;
        
      }
    }

  }
  getMasterData(key) {
    this.createBillService.getMasterData(key)
      .subscribe
      (
        res => {
          console.log('[getMasterData]-Response:%o', res);
          switch (key) {
            case '13':
              this.locations = res;
              break;
            case '14':
              this.places = res;
              break;
           
          }
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          console.log(err);
        }
      );
  }
}
