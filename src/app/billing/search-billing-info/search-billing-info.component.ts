import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchBillingInfoService } from 'src/app/services/search-billing-info.service';
import { SearchBillingResponse } from '../model/searchBillingResponse.model';
import { DatePipe, JsonPipe } from '@angular/common';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-search-billing-info',
  templateUrl: './search-billing-info.component.html',
  styleUrls: ['./search-billing-info.component.css']
})
export class SearchBillingInfoComponent implements OnInit {
  routeId: number;
  mainTitle: string;
  subTitle: string;
  userList: User[];
  doctorId: number;
  fromDate: string;
  toDate: string;
  providerId: number;
  patientName: string;
  feeTicket: string;
  patientId: string;
  searchBillingResponse: SearchBillingResponse[] = [];
  billingFormGroup = new FormGroup({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    patientName: new FormControl(''),
    feeTicket: new FormControl(''),
    providerName: new FormControl('')

  })
  constructor(private _avRoute: ActivatedRoute, private router: Router, private landingPageService: LandingPageService, private searchBillingInfoService: SearchBillingInfoService, private datePipe: DatePipe, private toastr: ToastrManager) {
    if (this._avRoute.snapshot.queryParams["id"] != undefined) {
      this.routeId = this._avRoute.snapshot.queryParams["id"];
      this.mainTitle = 'Billing';
      let data = this.searchBillingInfoService.getPatinetData();
      if (data != undefined) {
        let dateData = this.searchBillingInfoService.getDateInfo();
        this.billingFormGroup.patchValue({
          patientName: data.patientname,
          fromDate: dateData.fromDate,
          toDate: dateData.toDate
        })
        this.patientId = data.patientId;
      }
      this.billingFormGroup.controls['patientName']!.disable();

      if (this.routeId == -1) {

        this.subTitle = 'CREATE CHARGE';

      } else if (this.routeId == 1) {
        // this.mainTitle = 'INSURANCE CLAIM';
        this.subTitle = 'CREATE CLAIM';

      } else if (this.routeId == 2) {
        // this.mainTitle = 'INSURANCE CLAIM';
        this.subTitle = 'RESUBMIT CLAIM';

      } else if (this.routeId == 3) {
        // this.mainTitle = 'INSURANCE CLAIM';
        this.subTitle = 'MANAGE CLAIM';

      } else if (this.routeId == 9) {
        //this.mainTitle = 'INSURANCE CLAIM';
        this.subTitle = 'EOB';

      };

      this.getUserList();
    }
    else {
      // alert("jkd")


    }


  }
  searchBill() {
    if (this.routeId >= -1) {
      if (this.billingFormGroup.valid) {
        this.fromDate = this.datePipe.transform(this.billingFormGroup.controls['fromDate'].value, "MMddyyyy")
        this.toDate = this.datePipe.transform(this.billingFormGroup.controls['toDate'].value, "MMddyyyy")
        this.patientId = this.patientId
        this.feeTicket = this.billingFormGroup.controls['feeTicket'].value
        console.log('fromDate=' + this.fromDate + 'To Date=' + this.toDate + 'patientId=' + this.patientId + 'feeTicket=' + this.billingFormGroup.controls['feeTicket'].value + 'routeId=' + this.routeId + 'provider Id=' + this.doctorId);
        let claimstatusid: string = String(this.routeId)
        if (this.routeId == 2) {
          claimstatusid = "2,3,4";
        }
        if (this.routeId == 3) {
          claimstatusid = "2,4,8";
        }
        this.searchBillingInfoService.searchBillingInfo(this.fromDate, this.toDate, this.patientId, this.feeTicket, this.doctorId, claimstatusid).subscribe(res => {
          this.searchBillingResponse = res;
        }, error => {
          console.log("error while search billing Info");
        })
      } else {
        this.toastr.errorToastr("Please select From Date and To Date");
      }
    }
    //alert("search bill");
  }
  changeProvider(event) {
    this.doctorId = event.target.value
  }
  getUserList() {
    this.landingPageService.getUserList().subscribe((res) => {
      this.userList = res;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }


  editSearchResult(searchItem: any) {
    localStorage.removeItem("acceptcopay");
    if (this.subTitle == 'CREATE CHARGE') {
      this.router.navigate(['/create-bill'], { queryParams: { id: -1, appid: searchItem.appointmentId } });
    }
    else if (this.subTitle == 'CREATE CLAIM') {
      this.router.navigate(['/create-bill'], { queryParams: { id: 1, appid: searchItem.appointmentId } });
    }
    else if (this.subTitle == 'RESUBMIT CLAIM') {
      this.router.navigate(['/create-bill'], { queryParams: { id: 2, appid: searchItem.appointmentId } });
    }
    else if (this.subTitle == 'MANAGE CLAIM') {
      this.router.navigate(['/create-bill'], { queryParams: { id: 3, appid: searchItem.appointmentId } });
    }
    else if (this.subTitle == 'EOB') {
      this.router.navigate(['/eob-edit'], {
        queryParams: {
          chargeId: searchItem.chargeId,
          appid: searchItem.appointmentId
        }
      });
    }

  }

  searchPatient() {
    this.searchBillingInfoService.setDateInfo('dateInfo', {
      'fromDate': this.billingFormGroup.controls['fromDate'].value,
      'toDate': this.billingFormGroup.controls['toDate'].value
    });

    this.router.navigate(['/patient-search-appointment'], { queryParams: { mode: this.routeId } });
  }

}
