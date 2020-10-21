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
  selector: 'app-patient-balance',
  templateUrl: './patient-balance.component.html',
  styleUrls: ['./patient-balance.component.css']
})
export class PatientBalanceComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 
  title = 'Excel';   
  formData = new FormData();
  routeId: number;
  patientbalancelist: any = [];
  patientId: string='0';
  patientName: string;
  fromDate: string;
  toDate: string;
  show = false;
  partybalanceFormGroup = new FormGroup({
    
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
    if (data != undefined) {
      
      this.partybalanceFormGroup.patchValue({
        patientName: data.patientname
        
      })
      this.patientId = data.patientId;
    }
  }

  ngOnInit() {
    //this.getPaymentList();
    //this.clearLocalStorage();
  }
  
  searchPatient() {
    
    this.router.navigate(['/patient-search-appointment'], { queryParams: { mode: 12 } });
  }
  search() {
   
      this.patientId = this.patientId

      this._reportService.GetPatientBalance( this.patientId)
        .subscribe(res => {
          this.patientbalancelist = res;
          this.show = true;
        }, error => {
          console.log("error while search Patient Balance Info");
        })
   

  }
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'PatientBalance.xlsx');  
  }  
}