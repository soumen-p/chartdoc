import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { EventInput } from '@fullcalendar/core';
import { DatePipe } from '@angular/common';
import { AcceptcopayService } from '../services/accept-copay.service';
import { OfficeCalendarService } from '../services/officecalendar.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import {CoPay} from '../models/co-pay'
import { entry } from '../models/patient-allergies-entry.model';
import { SharedService } from 'src/app/core/shared.service';

@Component({
    selector: 'app-accept-copay',
    templateUrl: './accept-copay.component.html',
    styleUrls: ['./accept-copay.component.css']
})
export class AcceptcopayComponent implements OnInit {
    formData = new FormData();
    @ViewChild('formDir', { static: false }) private formDirective: NgForm;
    acceptcopayForm: FormGroup;
    doctors: any;
    calendardtl: any;
    today = new Date();
    minDate = undefined;
    patientId = 0;
    paymentTypes: any;
    ApppointmentId:string;
    coPayEntry: CoPay[];
    urlBack:string="";
    // copayTemp:CoPay;

    constructor(private router: Router,
        private loginService: AuthenticationService,
        private formBuilder: FormBuilder,
        private _avRoute: ActivatedRoute,
        private _acceptcopayService: AcceptcopayService,
        private config: NgbDatepickerConfig,
        public toastr: ToastrManager,
        private sharedService: SharedService
        ) {

        const current = new Date();
        // this.minDate = {
        //     year: current.getFullYear(),
        //     month: current.getMonth() + 1,
        //     day: current.getDate()
        // };
        this.minDate = current;
        if (this._avRoute.snapshot.queryParams["pid"]) {

            this.patientId = this._avRoute.snapshot.queryParams["pid"];

        }
        if (this._avRoute.snapshot.queryParams["back"]) {

            this.urlBack = this._avRoute.snapshot.queryParams["back"];

        }
        this.ApppointmentId = this._acceptcopayService.getCopayAppId('CopayAppId');

        this.acceptcopayForm = this.formBuilder.group({
            id: ['0'],
            paymenttype: ['0', [Validators.required]],
            refNo1: ['', [Validators.required]],
            refNo2: [''],
            paymentdate: [''],
            paydate: ['', [Validators.required]],
            amount: ['0', [Validators.required]],
            patientId: [this.patientId],
            add_line: [''],
            AppointmentId : [this.ApppointmentId],
        });

    }
    ngAfterViewInit() {


    }
    ngOnInit() {
        this.getPaymentType(9);

       this.getCopay(this.ApppointmentId);
    }

    getCopay(AppointmentID:string){
        this._acceptcopayService.getCopayDetails(AppointmentID)
        .subscribe((res) => {
            this.coPayEntry = res as CoPay[];        
        })       
        
    }

    getPaymentType(id: any) {
        let self = this;
        this._acceptcopayService.getPaymentType(id)
            .subscribe((res) => {
                this.paymentTypes = res;
            })
    };
    ngOnDestroy() {
        //document.body.className = "sidebar-collapse";

    }
    save() {
        if (!this.acceptcopayForm.valid) {
            return;
        } else {
            this.acceptcopayForm.patchValue({
                paymentdate: String(this.acceptcopayForm.value.paydate.getMonth() + 1).padStart(2, '0') + "" +
                  String(this.acceptcopayForm.value.paydate.getDate()).padStart(2, '0') + "" +
                  this.acceptcopayForm.value.paydate.getFullYear()
            });
            let coAmt=this.acceptcopayForm.value.amount;
            this._acceptcopayService.saveCopay(this.acceptcopayForm.value)
                .subscribe((res) => {
                    this.toastr.successToastr(" Save sucessfully..!", 'Success!');
                    if(this.urlBack==""){
                    this.router.navigate(['/flowsheet-book-appointment'],{queryParams:{id:1}});
                    }else{
                        this.sharedService.setLocalItem('acceptcopay', JSON.stringify("Yes"));
                        this.sharedService.setLocalItem('acceptcoamt',  JSON.stringify(coAmt));

                        this.router.navigate(['/'+this.urlBack],{queryParams:{id:-1, appid:this.ApppointmentId}});
                        
                    }
                }, err => {
                    this.toastr.errorToastr(String(err) + " , please contact system admin!", 'Oops!');
                   // this.acceptcopayForm.value.fromTime = fromtime;
                   // this.acceptcopayForm.value.fromTime = toTime;
                });
        }
    }
    reset(): void {
        this.acceptcopayForm.reset();
        this.acceptcopayForm.patchValue({
            
            id: 0
        })
        //this.router.navigate(['/flowsheet-book-appointment'],{queryParams:{id:1}});
        if(this.urlBack==""){
            this.router.navigate(['/flowsheet-book-appointment'],{queryParams:{id:1}});
            }else{
                this.sharedService.setLocalItem('acceptcopay', JSON.stringify("Yes"));
                this.sharedService.setLocalItem('acceptcoamt', JSON.stringify(0));
                this.router.navigate(['/'+this.urlBack],{queryParams:{id:-1, appid:this.ApppointmentId}});
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


}
