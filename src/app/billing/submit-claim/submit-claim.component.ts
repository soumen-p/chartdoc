import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CreateBillService } from '../../services/create-bill.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-submit-claim',
  templateUrl: './submit-claim.component.html'
})
export class SubmitClaimComponent implements OnInit {
  chargeId: string = "";
  patientName: string = "";
  formData = new FormData();
  flag: any;
  claimFieldsHeaders: any
  claimFieldsDetails: any;
  mode:string="";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _avRoute: ActivatedRoute,
    public toastr: ToastrManager,
    public createBillService: CreateBillService
  ) {
    let submitclaimInfo = this.createBillService.getsubmitclaimInfo('submitclaimInfo');
    this.chargeId = submitclaimInfo.chargeId;
    this.patientName = submitclaimInfo.patientName;
    this.mode = submitclaimInfo.mode;
    this.getClaimFieldsHeader(this.mode);
    this.getClaimFieldsDetails();
  }

  ngOnInit() {
    this.flag = 0;
  }
  getClaimFieldsHeader(mode: string) {
    this.createBillService.getClaimFieldsHeader()
      .subscribe((res) => {
        this.claimFieldsHeaders = res;
        this.claimFieldsHeaders.forEach(element => {
          element.chargeId = this.chargeId;
        });

        if (mode == "U") {
          this.createBillService.getInsuranceClaimFields(this.chargeId)
            .subscribe((res) => {
              //this.claimFieldsHeaders = res;
              this.claimFieldsHeaders.forEach(element => {
                element.value =res.filter((x:any)=>x.fieldid==element.id)[0]["value"];
              });
              console.log(this.claimFieldsHeaders);
            })
          }

          });
  }
  getClaimFieldsDetails() {
    this.createBillService.getClaimFieldsDetails("0")
      .subscribe((res) => {
        this.claimFieldsDetails = res;

      });

  }
  save() {
    this.formData = new FormData();
    this.formData.append('chargeId', JSON.stringify(this.chargeId));
    this.formData.append('typeem', JSON.stringify(this.flag));
    let patientChargeClaimFieldsdata: any = [];
    this.claimFieldsHeaders.forEach(element => {
      let obj: any = {};
      obj.chargeId = element.chargeId;
      obj.fieldid = element.id;
      obj.value = element.value=="Select"?"":element.value;
      patientChargeClaimFieldsdata.push(obj);
    });
    let fieldscount=patientChargeClaimFieldsdata.length;
    let datacount=patientChargeClaimFieldsdata.filter((x:any)=>x.value!="");
    if(datacount<=0){
      this.toastr.errorToastr('Claim fields requried', 'Error!');
      return ;
    }
    let self=this;
    this.formData.append('patientChargeClaimFields', JSON.stringify(patientChargeClaimFieldsdata));
    this.createBillService.savePatientChargeClaimFields(this.formData)
      .subscribe
      (
        res => {
          if(self.mode=="I"){
          this.router.navigate(['/resubmit-claim'], { queryParams: { id: 2 } });
          }else{
          this.router.navigate(['/manage-claim'], { queryParams: { id: 3 } });
          }
        },
        err => {
          this.toastr.errorToastr('please contact system admin!', 'Error!');
          console.log(err);
        }
      );
  }
  reset() {
    this.router.navigate(['/create-claim'], { queryParams: { id: 2 } });
  }
  onchange(data: any, event: any) {
    data.value = event.target.value;
  }
}