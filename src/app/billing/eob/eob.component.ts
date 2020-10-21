import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import {EobService} from './../../services/eob.service';
import { DatePipe } from '@angular/common';
import {BookAppointmentService} from './../../services/book-appointment.service';
@Component({
  selector: 'app-eob',
  templateUrl: './eob.component.html',
  styleUrls: ['./eob.component.css']
})
export class EobComponent implements OnInit {
  formData = new FormData();
  @ViewChild('formDir', { static: false }) private formDirective: NgForm;
  eobForm: FormGroup;
  references: any;
  services: any;
  subtitle: string = "";
  today = new Date();
  minDate = undefined;
  chargePatientDetails: any;
  claimAdjustments:any;
  appointmentId: any = 0;
  chargeId:any=0;
  pipe = new DatePipe('en-US');
  arrayCPTCriteria:any;
  reasons:[]=[];
  adjreasons:[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _avRoute: ActivatedRoute,
    public toastr: ToastrManager,
    public _eobService: EobService,
    public _bookAppointmentService:BookAppointmentService
  ) {
    const current = new Date();
    this.minDate = current;
    if (this._avRoute.snapshot.queryParams["appid"]) {
      this.appointmentId = this._avRoute.snapshot.queryParams["appid"];
    }
    if (this._avRoute.snapshot.queryParams["chargeId"]) {
      this.chargeId = this._avRoute.snapshot.queryParams["chargeId"];
    }
    this.eobForm = this.formBuilder.group({
      date: [''],
      date1:[''],
      patientName: [''],
      patientId: ['0'],
      feeTicketNo: [''],
      appointmentId: [this.appointmentId],
      claimBalance: ['0'],
      patientBalance: ['0'],
      statusId: ['0'],
      status: [''],
      chargeId: [this.chargeId],
      modeOfTransaction: [''],
      doctorName: [''],
      doctorId: ['0'],
      insuranceId1: ['0'],
      insuranceName1: [''],
      insuranceId2: ['0'],
      insuranceName2: [''],
      insuranceId3: ['0'],
      insuranceName3: [''],
      locationId: ['0'],
      locationName: [''],
      placeOfId: ['0'],
      placeOfName: [''],
      serviceId: ['0', [Validators.required]],
      serviceName: [''],
      referenceId: ['0', [Validators.required]],
      referenceName: [''],
      fileAsId: ['0', [Validators.required]],
      fileAsName: [''],
      adjreason:['0'],
      reason: [''],
      paidAmount: ['0'],
      denied:[0],
      amount:[''],
      groupName:[''],
      claimstatusId:[''],
      typeEM:['']
    });

  }

  ngOnInit() {
    this.getChargePatientHeader();
    this.getChargePatientDetails();
    //this.getChargePatientAdjustment();
    this.adjgetReason();
    
  }
  getReason() {
    this._bookAppointmentService.getReason('5')
      .subscribe((res) => {
        this.reasons = res;

      }, err => {
        console.log(err);
      });
  }
  adjgetReason() {
    this._bookAppointmentService.getReason('6')
      .subscribe((res) => {
        this.adjreasons = res;

      }, err => {
        console.log(err);
      });
  }
  changeReason(event:any){
    this.chargePatientDetails[0].reasonId = event.target.options[event.target.options.selectedIndex].value;
  }
  getChargePatientDetails() {
    this._eobService.getChargePatientDetails(this.appointmentId)
      .subscribe((res) => {
        this.chargePatientDetails = res;
      });
  }
  getChargePatientAdjustment(){
    this._eobService.getChargePatientAdjustment(this.eobForm.value.chargeId)
    .subscribe((res) => {
      this.claimAdjustments=res;
    });
  }
  
  getChargePatientHeader() {
    this._eobService.getChargePatientHeader(this.appointmentId)
      .subscribe((res) => {
        this.eobForm.patchValue({
          date1: this.pipe.transform(new Date(res.date), 'dd/MM/yyyy'),
          date:  this.pipe.transform(new Date(res.date), 'MM-dd-yyyy'),
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
          reasonId:res.reasonId,
          typeEM:res.typeEM
        })
        this.getReason();
        this.getChargePatientAdjustment();
      })
  }
 
  reset(): void {
    this.router.navigate(['/create-eob'], { queryParams: { id: 9 } });
  }
  deleteAdjustment(adj:any){
    this.claimAdjustments
    =this.claimAdjustments.filter((x:any)=> x.reasonId !==adj.reasonId);
  }
  addAdjustment(){
    if(this.eobForm.value.amount=="" || this.eobForm.value.amount =="0"){
      this.toastr.errorToastr('Adjustment Amount requried', 'Error!');
      return;
    }
    else if(this.eobForm.value.groupName=="" ){
      this.toastr.errorToastr('Group Name requried', 'Error!');
      return;
    }
    else if(this.eobForm.value.adjreason=="0" ){
      this.toastr.errorToastr('Reason requried', 'Error!');
      return;
    }
    if(this.claimAdjustments.length>0 && this.claimAdjustments.filter((x:any)=>x.reasonId ==this.eobForm.value.adjreason).length>0 )
    {
      this.toastr.errorToastr('Reason already added', 'Error!');
      return;
    }
    var amount=this.eobForm.value.amount;
    var groupName=this.eobForm.value.groupName;
    var reasonId=this.eobForm.value.adjreason;
    let reason=this.adjreasons.filter((x:any)=>x.reasonId==reasonId)[0]["reasonDescription"];
    this.claimAdjustments.push({amount:amount,groupName:groupName,reasonId:reasonId,reason:reason})
    this.clearAdjustment();
  }
  clearAdjustment(){
    this.eobForm.patchValue({
      amount:'',
      groupName:'',
      reason:'',
      adjreason:['0']
    });
  }
  calculateBalance(detail:any){
    detail.balance=detail.allowedAmount-detail.deduction-detail.paymentReceived-detail.insAdjustment-detail.miscAdjustment-detail.insuranceBalance;
  }
  save() {
    if(this.chargePatientDetails[0].miscAdjustment!="" && this.claimAdjustments.length<=0){
      this.toastr.errorToastr('Adjustment requried', 'Error!');
      return;
    }
    else if(this.chargePatientDetails[0].miscAdjustment!="" && this.claimAdjustments.length>0){
      let miscAdjustment=Number(this.chargePatientDetails[0].miscAdjustment);
      let adjustmentAmt=0;
      this.claimAdjustments.forEach(obj => {
        adjustmentAmt =adjustmentAmt+Number(obj.amount);

       });
      if(miscAdjustment!=adjustmentAmt){
        this.toastr.errorToastr('Misc and Adjustment amount mismatch', 'Error!');
        return;
      }
      
    }
    if(this.chargePatientDetails[0].balance!="" && Number(this.chargePatientDetails[0].balance)<0){
        this.toastr.errorToastr('Please check balance', 'Error!');
        return;
    }
    this.eobForm.patchValue({
      claimstatusId:this.eobForm .value.denied?10:11
    })
    this.formData = new FormData();
    this.formData.append('chargeId', JSON.stringify(this.eobForm.value.chargeId));
    this.formData.append('isDelete', JSON.stringify('N'));
    this.formData.append('claimHeader', JSON.stringify(this.eobForm.value));
    this.formData.append('claimDetails', JSON.stringify(this.chargePatientDetails[0]));
    this.formData.append('claimAdjustment', JSON.stringify(this.claimAdjustments));
    //console.log(this.formData);
    this._eobService.saveClaim(this.formData)
      .subscribe
      (
        res => {
          this.toastr.successToastr('Operation Successful');
          this.router.navigate(['/create-eob'], { queryParams: { id: 9 } });
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          console.log(err);
        }
      );
  }
  opencptsearch(){
    document.getElementById('cptSearch').style.display = 'block';
  
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
}
