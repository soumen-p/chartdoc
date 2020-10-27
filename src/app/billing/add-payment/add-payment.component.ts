import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import {PaymentService} from './../../services/payment.service';
import { DatePipe } from '@angular/common';
import {BookAppointmentService} from './../../services/book-appointment.service';
import { AppointmentService } from './../../services/appointment.service';
import { PatientSearchService } from './../../services/patient-search.service';
import { AcceptcopayService } from '../../services/accept-copay.service';
import { SharedService } from 'src/app/core/shared.service';

@Component({
  selector: 'app-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
  
})
export class AddPaymentComponent implements OnInit {
  formData = new FormData();
  addPaymentForm: FormGroup;
  payment:any;
  paymentId:any=0;
  patientId:any;
  options:any={};
  reasons:[]=[];
  paymentHeader:any;
  paymentTypes:any=[];
  paymentDetails:any=[];
  paymentBreakup:any=[];
  typeOfTxnId:any;
  selectedReasonId:any;
  selectedPatientId:any;
  transferId:any;
  transactionType:any;
  totalPaymentAmount:number=0;
  totalPaidAmount:number=0;

  isDisabledPayment:boolean=true;
  isDisabledRefund:boolean=true;
  isDisabledTransfer:boolean=true;
  isDisabledWriteoff:boolean=true;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private _avRoute: ActivatedRoute,
    public toastr: ToastrManager,
    public _bookAppointmentService:BookAppointmentService,
    public _appointmentService:AppointmentService,
    public _patientSearchService:PatientSearchService,
    public _paymentService:PaymentService,
    private _acceptcopayService: AcceptcopayService,
    private sharedService: SharedService
    ) {
      if (this._avRoute.snapshot.queryParams["paymentId"]) {
        this.paymentId = this._avRoute.snapshot.queryParams["paymentId"];
      }
      if (this._avRoute.snapshot.queryParams["patientId"]) {
        this.patientId = this._avRoute.snapshot.queryParams["patientId"];
        this.getPaymentDetails(this.patientId,null);
      }
      this.options.payment=true;
      this.addPaymentForm = this.formBuilder.group({
        date: [''],
        patientId:[0],
        patientName: [''],
        address: [''],
        mobile: [''],
        email: [''],
        payment:[''],
        refund:[''],
        transfer:[''],
        writeoff:[''],
        reasonId:[0],
        totalBillValue:[0],
        totalOutstanding:[''],
        alreadyPaid:[''],
        instrumentTypeId:[""],
        ref1:[''],
        ref2:[''],
        paymentDate:[''],
        amount:[''],
        amountForTranser:[''],
        paymentDateForTranser:[''],
        transferName:[''],
        transferId:[0]
      });
     }

  ngOnInit() {
    this.getReason();
    this.getPaymentType(9);
    const tranType=this._paymentService.getTxnTypeInfo("TxnTypeInfo");
    if(tranType!=null)
      this.setTransactionInfo(tranType);
    // else
    //   this.setTransactionInfo(1);

    const searchPatientType= this._paymentService.getPatientSearchTypeInfo("searchType")
    if(searchPatientType!=null)
      this.setPaymentInfo(searchPatientType);

      this.setReasonType();
    // const tranType=this._patientSearchService.getTxnTypeInfo("TxnTypeInfo");
    // if(this.paymentId==0 && tranType!=null)
    //   this.setTransactionInfo(tranType);

    // this.setReasonType();
    // this.clearLocalStorage();
    if(this.patientId!=null && this.paymentId>0){
      this.getPaymentDetails(this.patientId,null);
    }
    this.onSumOfPaidAmount(null);
  }
  getReason() {
    this._bookAppointmentService.getReason('-1')
      .subscribe((res) => {
        this.reasons = res;

      }, err => {

      });
  }
  getPaymentType(id: any) {
    let self = this;
    this._acceptcopayService.getPaymentType(id)
        .subscribe((res) => {
            this.paymentTypes = res;
        })
  }
  selectTransactionType(tranType:any){
    this.clearForm();
    this.setTransactionInfo(tranType);
  }
  setTransactionInfo(tranType:any){
    if(tranType==1){
      this.options="payment";
      this.transactionType="Payment" ;
    }
    else if(tranType==2){
      this.options="refund";
      this.transactionType="refund" ;
    }
    else if(tranType==3){
      this.options="transfer";
      this.transactionType="transfer" ;
    }
    else if(tranType==4){
      this.options="writeoff";
      this.transactionType="writeoff" ;
    }
  
    this.typeOfTxnId=tranType;
    this.paymentDetails=[];
    this._paymentService.setTxnTypeInfo("TxnTypeInfo",tranType)
  }
  setReasonType(){
    this.selectedReasonId=this._paymentService.getReasonInfo("reasonInfo");
    if(this.selectedReasonId!=null){
      this.addPaymentForm.patchValue({
      reasonId:this.selectedReasonId
    });
  }
}

  changeReason(event:any){
    this.selectedReasonId = event.target.options[event.target.options.selectedIndex].value;
    if(this.paymentDetails!=null){
        this.paymentDetails.forEach(obj => {
            obj.reasonId=this.selectedReasonId
        });
    }
    this._paymentService.setReasonInfo("reasonInfo",this.selectedReasonId)
  }
 searchPatient() {
  if(typeof this.typeOfTxnId == "undefined" || this.typeOfTxnId == null) {
    this.toastr.errorToastr('Transaction type can not be blank', 'Error!');
    return;
  }
 else
    this._paymentService.setPatientSearchTypeInfo("searchType",1)
    this.router.navigate(['/patient-search-appointment'], { queryParams: { id: 2 } });

  }
  searchPatientForTransfer() {
    if(typeof this.typeOfTxnId == "undefined" || this.typeOfTxnId == null) {
      this.toastr.errorToastr('Transaction type can not be blank', 'Error!');
      return;
    }
   else if(typeof this.selectedPatientId == "undefined" || this.selectedPatientId == null) {
      this.toastr.errorToastr('Patient can not be blank', 'Error!');
      return;
    }
    else if(typeof this.selectedReasonId == "undefined" || this.selectedReasonId == null) {
      this.toastr.errorToastr('Reason can not be blank', 'Error!');
      return;
    }
    else{
    this._paymentService.setPatientSearchTypeInfo("searchType",2)
    this.router.navigate(['/patient-search-appointment'], { queryParams:{ id: 2 }  });
    }
  }
  setPaymentInfo(searchPatientType:any){
     const patientSearchInfo = this._patientSearchService.getPatientSearchInfo('addPaymentInfo');
      if(searchPatientType==1 && patientSearchInfo!=null){
        this.clearForm();
       this.getPaymentDetails(patientSearchInfo.patientId,null);
       this._paymentService.setHeaderPatientSearchId("headerPatientId",patientSearchInfo.patientId)
      }
      else if(searchPatientType==2 && patientSearchInfo!=null){
        const headerPatientId= this._paymentService.getHeaderPatientSearchId("headerPatientId")
        this.getPaymentDetails(headerPatientId,this.typeOfTxnId);
        this.getPaymentBreakup(patientSearchInfo.patientId);
         this.transferId=patientSearchInfo.patientId;
         this.addPaymentForm.patchValue({
          transferId:patientSearchInfo.patientId,
          transferName:patientSearchInfo.patientname
         });
        }
  }
  getPaymentBreakup(patientId:any){
  this._paymentService.getPaymentBreakup(patientId,this.paymentId)
    .subscribe((res) => {
      this.paymentBreakup = res;
    });
  }
getPaymentDetails(patientId:any,typeOfTxnId:any){
    this._paymentService.getPaymentDetails(patientId,this.paymentId)
    .subscribe((res) => {
      if(res.paymentHeader!=null ){
        this.addPaymentForm.patchValue({
          patientId:res.paymentHeader.patientId,
          patientName:res.paymentHeader.patientName,
          address:res.paymentHeader.address,
          email:res.paymentHeader.email,
          mobile:res.paymentHeader.mobile,
          totalBillValue:res.paymentHeader.totalBillValue,
          alreadyPaid:res.paymentHeader.alreadyPaid,
          totalOutstanding:res.paymentHeader.totalOutstanding
        });
       }
       if(res.paymentDetails!=null){
        if(typeOfTxnId!=null)
          {
            this.setTransactionInfo(typeOfTxnId);
            
          }
          else{
            this._paymentService.setPaymentId("paymentId",this.paymentId)
            this.setTransactionInfo(res.paymentDetails[0].typeOfTxnId);

          }
          if (res.paymentDetails[0].paymentDate != '') {
            let paymentDate = new Date(res.paymentDetails[0].paymentDate);
           
          let pat_year = paymentDate.getFullYear();
          let pay_month = String(paymentDate.getMonth() + 1).padStart(2, '0');;
          let pay_day = String(paymentDate.getDate()).padStart(2, '0');

          this.addPaymentForm.patchValue({
            reasonId:res.paymentDetails[0].reasonId,
            transferId:res.paymentDetails[0].transferId,
            transferName:res.paymentDetails[0].transferName,
            paymentDateForTranser:String(pat_year  + "-" + pay_month + "-" + pay_day),
            amountForTranser:res.paymentDetails[0].amount
          });
        }
          this.selectedReasonId=res.paymentDetails[0].reasonId
      }
      if(res.paymentHeader!=null)
         {this.paymentHeader=res.paymentHeader;
          this._paymentService.setHeaderPatientSearchId("headerPatientId",res.paymentHeader.patientId);
          this.selectedPatientId=res.paymentHeader.patientId;
         }
      if(res.paymentDetails!=null)
         this.paymentDetails=res.paymentDetails;  
        if(typeOfTxnId !=3){// only for transfer    
            if(res.paymentBreakup!=null)
            this.paymentBreakup = res.paymentBreakup;
            this.onSumOfPaidAmount(0);
     }
     this.calculateTotalDetailAmount();
    }); 
   
  }
  addTransactionDetails(){
    var instrumentTypeId=this.addPaymentForm.value.instrumentTypeId;
    var instrumentTypeName=    this.paymentTypes.filter((x:any)=>x.id ===instrumentTypeId);
    var ref1=this.addPaymentForm.value.ref1;
    var ref2=this.addPaymentForm.value.ref2;
    var paymentDate=this.addPaymentForm.value.paymentDate;
    var amount=this.addPaymentForm.value.amount;

    if(typeof this.typeOfTxnId == "undefined" || this.typeOfTxnId == null) {
      this.toastr.errorToastr('Transaction type can not be blank', 'Error!');
      return;
    }
   else if(typeof this.selectedPatientId == "undefined" || this.selectedPatientId == null) {
      this.toastr.errorToastr('Patient can not be blank', 'Error!');
      return;
    }
    else if(typeof this.selectedReasonId == "undefined" || this.selectedReasonId == null) {
      this.toastr.errorToastr('Reason can not be blank', 'Error!');
      return;
    }
    else if(instrumentTypeId==""){
      this.toastr.errorToastr('Payment Type can not be blank', 'Error!');
      return;
    }
    else if(ref1==""){
      this.toastr.errorToastr('Ref 1 can not be blank', 'Error!');
      return;
    }
    else if(ref2==""){
      this.toastr.errorToastr('Ref 2 can not be blank', 'Error!');
      return;
    }
    else if(paymentDate==""){
      this.toastr.errorToastr('Payment date can not be blank', 'Error!');
      return;
    }
    else if(amount==undefined || amount==""){
      this.toastr.errorToastr('Amount can not be blank', 'Error!');
      return;
    }
    else{
      var paymentDetailId=-100;
      if(this.paymentDetails!=null && this.paymentDetails.length>0){
        paymentDetailId=this.paymentDetails.length-100;
      }
    this.paymentDetails.push(
      { paymentDetailId:paymentDetailId
        ,patientId:this.selectedPatientId
        ,reasonId:this.selectedReasonId
        ,typeOfTxnId:this.typeOfTxnId
        ,instrumentTypeId:instrumentTypeId
        ,instrumentTypeName:instrumentTypeName[0].name
        ,ref1:ref1
        ,ref2:ref2
        ,paymentDate:paymentDate
        ,amount:amount
      })
      this.calculateTotalDetailAmount();
    this.clearAdjustment();
    }
  }
  calculateTotalDetailAmount(){
    if(this.paymentDetails.length>0){
      this.totalPaymentAmount = this.paymentDetails.map(a => a.amount).reduce(function(a, b)
        {
          return parseFloat(a) + parseFloat(b);
        });
      }
  }
 clearAdjustment(){
    this.addPaymentForm.patchValue({
      instrumentTypeId:'',
      ref1:'',
      ref2:'',
      paymentDate:'',
      amount:''
    });
  }

save() {
    this.formData = new FormData();
    if(typeof this.typeOfTxnId == "undefined" || this.typeOfTxnId == null) {
      this.toastr.errorToastr('Transaction type can not be blank', 'Error!');
      return;
    }
   else if(typeof this.selectedPatientId == "undefined" || this.selectedPatientId == null) {
      this.toastr.errorToastr('Patient can not be blank', 'Error!');
      return;
    }
    else if(typeof this.selectedReasonId == "undefined" || this.selectedReasonId == null) {
      this.toastr.errorToastr('Reason can not be blank', 'Error!');
      return;
    }
    if(this.totalPaidAmount>this.totalPaymentAmount){
      this.toastr.errorToastr('Total Paid amount can not be greater than paid amount', 'Error!');
      return;
    }
    if(this.typeOfTxnId==3){
      if(parseFloat(this.addPaymentForm.value.totalOutstanding) < parseFloat(this.addPaymentForm.value.amountForTranser)){
        this.toastr.errorToastr('You not have sufficient amount !', 'Error!');
        return;
      }
        var paymentDateForTranser=this.addPaymentForm.value.paymentDateForTranser;
        var amountForTranser=this.addPaymentForm.value.amountForTranser;
        var transferId=this.addPaymentForm.value.transferId;
        this.paymentId=this._paymentService.getPaymentId("paymentId");

        this.paymentDetails=[];
          this.paymentDetails.push(
            { patientId:this.selectedPatientId
              ,reasonId:this.selectedReasonId
              ,typeOfTxnId:this.typeOfTxnId
              ,transferId:transferId
              ,paymentDate:paymentDateForTranser
              ,amount:amountForTranser
            })
    }
    if(this.paymentBreakup.length>0)
      var paymentBrkup=this.paymentBreakup.filter((x => x.paidAmount >0 ))
   if(this.paymentId==null)
      this.paymentId=0;

    this.formData.append('paymentId', this.paymentId);
     this.formData.append('isDeleted', JSON.stringify('N'));
    this.formData.append('paymentDetails', JSON.stringify(this.paymentDetails));
    this.formData.append('paymentBreakup', JSON.stringify(paymentBrkup));
    this._paymentService.savePayment(this.formData)
      .subscribe
      (
        res => {
           this.clearLocalStorage();
          this.toastr.successToastr('Operation Unsuccessful');
          this.router.navigate(['/payment']);
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          
        }
      );
    
  }
clearForm(){
  this.paymentDetails=[];
  this.paymentBreakup=[];

  this.addPaymentForm.patchValue({
    date: [''],
    patientId:[0],
    patientName: [''],
    address: [''],
    mobile: [''],
    email: [''],
    payment:[''],
    refund:[''],
    transfer:[''],
    writeoff:[''],
    reasonId:[0],
    totalBillValue:[0],
    totalOutstanding:[''],
    alreadyPaid:[''],
    instrumentTypeId:[""],
    ref1:[''],
    ref2:[''],
    paymentDate:[''],
    amount:[''],
    amountForTranser:[''],
    paymentDateForTranser:[''],
    transferName:[''],
    transferId:[0]
  });
 }
 cancel(){
   this.clearLocalStorage();
  this.router.navigate(['/payment']);
 }
  clearLocalStorage(){
    this._patientSearchService.setPatientSearchInfo('addPaymentInfo',null);
    this._paymentService.setPatientSearchTypeInfo("searchType",null)
    this._paymentService.setHeaderPatientSearchId("headerPatientId",null)
    this._paymentService.setHeaderPatientSearchId("paymentId",null)
    this._paymentService.setTxnTypeInfo("TxnTypeInfo",null);
    this._paymentService.setReasonInfo("reasonInfo",null);
    this._paymentService.setPatientSearchTypeInfo("searchType",null);
  }
  deletePaymentDetail(data:any){
    this.paymentDetails=this.paymentDetails.filter((x:any)=>x.paymentDetailId !=data.paymentDetailId)
    this.calculateTotalDetailAmount();
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
  onSumOfPaidAmount(freeTicket){
    if(freeTicket!=null){
    if(freeTicket.paidAmount > freeTicket.amount)
    {
      this.toastr.errorToastr('Paid amount can not be greater than due amoount for ticket '+ freeTicket.freeTicketNo, 'Error!');
      freeTicket.paidAmount=0;
    }
  }
    if(this.paymentBreakup.length>0){
    this.totalPaidAmount = this.paymentBreakup.map(a => a.paidAmount).reduce(function(a, b)
    {
      return parseFloat(a) + parseFloat(b);
    });
  }
}

onAmountForTranser(){
  var amountForTranser=this.addPaymentForm.value.amountForTranser;
  this.totalPaymentAmount=amountForTranser;
  if(parseFloat(amountForTranser) > this.addPaymentForm.value.totalOutstanding){
    this.toastr.errorToastr('You not have sufficient amount !', 'Error!');

    this.addPaymentForm.patchValue({
      amountForTranser:0
    });
  }
}

getToday(): string {
  return new Date().toISOString().split('T')[0]
}
}
