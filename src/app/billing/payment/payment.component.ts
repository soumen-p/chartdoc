import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import {PaymentService} from './../../services/payment.service';
import { PatientSearchService } from './../../services/patient-search.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  formData = new FormData();
  routeId: number;
  paymentList:any=[];
  patientId: string;
  patientName: string;
  fromDate: string;
  toDate: string;
  
  paymentFormGroup = new FormGroup({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    patientName: new FormControl('')

  })

  constructor(private _avRoute: ActivatedRoute
    , private router: Router
    , public toastr: ToastrManager
    , private landingPageService: LandingPageService
    ,public _patientSearchService:PatientSearchService
    ,private _paymentService:PaymentService
    , private datePipe: DatePipe) { 

      let data = this._paymentService.getPatinetData();
      if (data != undefined) {
        let dateData = this._paymentService.getDateInfo();
        this.paymentFormGroup.patchValue({
          patientName: data.patientname,
          fromDate: dateData.fromDate,
          toDate: dateData.toDate
        })
        this.patientId = data.patientId;
      }
    }

  ngOnInit() {
    //this.getPaymentList();
    this.clearLocalStorage();
  }
  getPaymentList() {
    let self = this;
    this._paymentService.getPaymentList()
        .subscribe((res) => {
            this.paymentList = res;
        })
};
  addPayment(){
    this.router.navigate(['/add-payment'],{queryParams:{paymentId:0}});
  }
  editPayment(payment:any){
    this.router.navigate(['/add-payment'],{queryParams:{paymentId:payment.paymentId,patientId:payment.patientId}});
  }
  deletePayment(payment:any){
    this.formData = new FormData();
    this.formData.append('paymentId', payment.paymentId);
    this.formData.append('isDeleted', JSON.stringify('Y'));
    this.formData.append('paymentDetails', null);
    this.formData.append('paymentBreakup', null);

    this._paymentService.savePayment(this.formData)
      .subscribe
      (
        res => {
          this.toastr.successToastr('Operation Unsuccessful');
          this.getPaymentList();
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          console.log(err);
        }
      );
  }

  clearLocalStorage(){
    this._patientSearchService.setPatientSearchInfo('addPaymentInfo',null);
    this._paymentService.setPatientSearchTypeInfo("searchType",null)
    this._paymentService.setHeaderPatientSearchId("headerPatientId",null)
    this._paymentService.setTxnTypeInfo("TxnTypeInfo",null);
    this._paymentService.setReasonInfo("reasonInfo",null);
  }
  searchBill() {
      if (this.paymentFormGroup.valid) {
        this.fromDate = this.datePipe.transform(this.paymentFormGroup.controls['fromDate'].value, "MMddyyyy")
        this.toDate = this.datePipe.transform(this.paymentFormGroup.controls['toDate'].value, "MMddyyyy")
        this.patientId = this.patientId
        
        this._paymentService.searchPayment(this.fromDate, this.toDate, this.patientId)
        .subscribe(res => {
          this.paymentList = res;
        }, error => {
          console.log("error while search billing Info");
        })
      } else {
        this.toastr.errorToastr("Please select From Date and To Date");
      }
    
  }
  searchPatient() {
    this._paymentService.setDateInfo('dateInfo', {
      'fromDate':this.paymentFormGroup.controls['fromDate'].value,
      'toDate': this.paymentFormGroup.controls['toDate'].value
    });

    this.router.navigate(['/patient-search-appointment'], { queryParams: { mode: 10 } });
  }
}
