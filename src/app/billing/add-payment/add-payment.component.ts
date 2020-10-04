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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private _avRoute: ActivatedRoute,
    public toastr: ToastrManager,
    public _bookAppointmentService:BookAppointmentService,
    public _appointmentService:AppointmentService,
    public _patientSearchService:PatientSearchService,
    public _paymentService:PaymentService,
    private _acceptcopayService: AcceptcopayService,
    ) {
      if (this._avRoute.snapshot.queryParams["paymentId"]) {
        this.paymentId = this._avRoute.snapshot.queryParams["paymentId"];
      }
      if (this._avRoute.snapshot.queryParams["patientId"]) {
        this.patientId = this._avRoute.snapshot.queryParams["patientId"];
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
    else
      this.setTransactionInfo(1);

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
      this.getPaymentDetails(this.patientId);
    }
  }
  getReason() {
    this._bookAppointmentService.getReason('-1')
      .subscribe((res) => {
        this.reasons = res;

      }, err => {
        console.log(err);
      });
  }
  getPaymentType(id: any) {
    let self = this;
    this._acceptcopayService.getPaymentType(id)
        .subscribe((res) => {
            this.paymentTypes = res;
        })
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
  else{
    this.options="payment";
    this.transactionType="Payment" ;
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
    this._paymentService.setPatientSearchTypeInfo("searchType",1)
    this.router.navigate(['/patient-search-appointment'], { queryParams: { id: 2 } });
  }
  searchPatientForTransfer() {
    this._paymentService.setPatientSearchTypeInfo("searchType",2)
    this.router.navigate(['/patient-search-appointment'], { queryParams: { id: 2 } });
  }
  setPaymentInfo(searchPatientType:any){
     const patientSearchInfo = this._patientSearchService.getPatientSearchInfo('addPaymentInfo');
      if(searchPatientType==1 && patientSearchInfo!=null){
        this.clearForm();
       this.getPaymentDetails(patientSearchInfo.patientId);
       this._paymentService.setHeaderPatientSearchId("headerPatientId",patientSearchInfo.patientId)
      }
      else if(searchPatientType==2 && patientSearchInfo!=null){
        const headerPatientId= this._paymentService.getHeaderPatientSearchId("headerPatientId")
        this.getPaymentDetails(headerPatientId);
         this.transferId=patientSearchInfo.patientId;
         this.addPaymentForm.patchValue({
          transferId:patientSearchInfo.patientId,
          transferName:patientSearchInfo.patientname
         });
        }
  }
getPaymentDetails(patientId:any){
    this._paymentService.getPaymentDetails(patientId,this.paymentId)
    .subscribe((res) => {
      if(res.paymentHeader!=null ){
        this.addPaymentForm.patchValue({
          patientId:res.paymentHeader.patientId,
          patientName:res.paymentHeader.patientName,
          address:res.paymentHeader.address,
          email:res.paymentHeader.email,
          mobile:res.paymentHeader.mobile,
          totalbillvalue:res.paymentHeader.totalBillValue,
          alreadyPaid:res.paymentHeader.alreadyPaid,
          totalOutstanding:res.paymentHeader.totalOutstanding
        });
       }
      if(res.paymentDetails!=null){
          this.setTransactionInfo(res.paymentDetails[0].typeOfTxnId);
          this.addPaymentForm.patchValue({
            reasonId:res.paymentDetails[0].reasonId,
            transferId:res.paymentDetails[0].transferId,
            transferName:res.paymentDetails[0].transferName,
            paymentDateForTranser:res.paymentDetails[0].paymentDate,
            amountForTranser:res.paymentDetails[0].amount
          });
          this.selectedReasonId=res.paymentDetails[0].reasonId
      }
      if(res.paymentHeader!=null)
         this.paymentHeader=res.paymentHeader;
      if(res.paymentDetails!=null)
         this.paymentDetails=res.paymentDetails;      
      if(res.paymentBreakup!=null)
        this.paymentBreakup = res.paymentBreakup;
        
      this._paymentService.setHeaderPatientSearchId("headerPatientId",res.paymentHeader.patientId)
      this.selectedPatientId=res.paymentHeader.patientId;
    }); 
   
  }
  addTransactionDetails(){
    var instrumentTypeId=this.addPaymentForm.value.instrumentTypeId;
    var instrumentTypeName=    this.paymentTypes.filter((x:any)=>x.id ===instrumentTypeId);
    var ref1=this.addPaymentForm.value.ref1;
    var ref2=this.addPaymentForm.value.ref1;
    var paymentDate=this.addPaymentForm.value.paymentDate;
    var amount=this.addPaymentForm.value.amount;
    this.paymentDetails.push(
      { patientId:this.selectedPatientId
        ,reasonId:this.selectedReasonId
        ,typeOfTxnId:this.typeOfTxnId
        ,instrumentTypeId:instrumentTypeId
        ,instrumentTypeName:instrumentTypeName[0].name
        ,ref1:ref1
        ,ref2:ref2
        ,paymentDate:paymentDate
        ,amount:amount
      })
    this.clearAdjustment();
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
   
    if(this.typeOfTxnId==3){
        var paymentDateForTranser=this.addPaymentForm.value.paymentDateForTranser;
        var amountForTranser=this.addPaymentForm.value.amountForTranser;
        var transferId=this.addPaymentForm.value.transferId;
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
    this.formData.append('paymentId', this.paymentId);
    this.formData.append('isDeleted', JSON.stringify('N'));
    this.formData.append('paymentHeader', JSON.stringify(this.paymentHeader));
    this.formData.append('paymentDetails', JSON.stringify(this.paymentDetails));
    this.formData.append('paymentBreakup', JSON.stringify(this.paymentBreakup));
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
          console.log(err);
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
    this._paymentService.setTxnTypeInfo("TxnTypeInfo",null);
    this._paymentService.setReasonInfo("reasonInfo",null);
  }
  deletePaymentDetail(data:any){

  }
}
