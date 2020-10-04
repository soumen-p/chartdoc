import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import {PaymentService} from './../../services/payment.service';
import { PatientSearchService } from './../../services/patient-search.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  formData = new FormData();
  routeId: number;
  paymentList:any=[];
  constructor(private _avRoute: ActivatedRoute
    , private router: Router
    , public toastr: ToastrManager
    , private landingPageService: LandingPageService
    ,public _patientSearchService:PatientSearchService
    ,private _paymentService:PaymentService) { }

  ngOnInit() {
    this.getPaymentList();
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
}
