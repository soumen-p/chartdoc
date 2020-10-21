import { Component, OnInit,ElementRef,ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { ReportService } from './../../services/report.service';
import { PatientSearchService } from './../../services/patient-search.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import * as XLSX from 'xlsx';  
@Component({
  selector: 'app-party-ledger',
  templateUrl: './party-ledger.component.html',
  styleUrls: ['./party-ledger.component.css']
})
export class PartyLedgerComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 
  title = 'Excel';   
  formData = new FormData();
  routeId: number;
  partyledgerList: any = [];
  patientId: string;
  patientName: string;
  fromDate: string;
  toDate: string;
  show = false;
  partyledgerFormGroup = new FormGroup({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    patientName: new FormControl('')

  })
  constructor(private _avRoute: ActivatedRoute
    , private router: Router
    , public toastr: ToastrManager
    , private landingPageService: LandingPageService
    , public _patientSearchService: PatientSearchService
    , private _reportService: ReportService
    , private datePipe: DatePipe) {

    let data = this._reportService.getPatinetData();
    let dateData = this._reportService.getDateInfo();
    if (data != undefined && dateData  != undefined) {
      
      this.partyledgerFormGroup.patchValue({
        patientName: data.patientname,
        fromDate: dateData.fromDate,
        toDate: dateData.toDate
      })
      this.patientId = data.patientId;
    }
  }

  ngOnInit() {
    //this.getPaymentList();
    //this.clearLocalStorage();
  }
 
  searchPatient() {
    this._reportService.setDateInfo('dateInfo', {
      'fromDate': this.partyledgerFormGroup.controls['fromDate'].value,
      'toDate': this.partyledgerFormGroup.controls['toDate'].value
    });

    this.router.navigate(['/patient-search-appointment'], { queryParams: { mode: 11 } });
  }
  search() {
    if (this.partyledgerFormGroup.valid) {
      this.fromDate = this.datePipe.transform(this.partyledgerFormGroup.controls['fromDate'].value, "MMddyyyy")
      this.toDate = this.datePipe.transform(this.partyledgerFormGroup.controls['toDate'].value, "MMddyyyy")
      this.patientId = this.patientId

      this._reportService.GetPartyLedger(this.fromDate, this.toDate, this.patientId)
        .subscribe(res => {
          this.partyledgerList = res;
          this.show = true;
        }, error => {
          console.log("error while search party ledger Info");
        })
    } else {
      this.toastr.errorToastr("Please select From Date and To Date");
    }

  }
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'PartyLedger.xlsx');  
  }  
}