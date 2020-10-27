import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { PatientIcdService } from 'src/app/services/patient-icd.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PatientCptService } from 'src/app/services/patient-cpt.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-common-search',
  templateUrl: './common-search.component.html',
  styleUrls: ['./common-search.component.css']
})
export class CommonSearchComponent implements OnInit {
  pageOfItems: Array<any>;
  @Input() searchCriteria: string;
  //@Output() arrayCriteria: [] = [];
  @Output() arrayCriteria = new EventEmitter();
  details: [] = [];
  public searchTerm: string;

  formGroup: FormGroup;
  
  constructor(private patientIcdService: PatientIcdService,
              public toastr: ToastrManager,
              private patientCptService: PatientCptService,
              public fb: FormBuilder) { }

  ngOnInit() {
    if(this.searchCriteria === 'icd'){
      this.patientIcdService.getPatientIcdDetails().subscribe((res) => {
        this.details = res;
      },
      err => {
        this.toastr.errorToastr(err);
      });
    }
    else{
      this.patientCptService.getCptWithChargeAmountDetails().subscribe(res => {
        this.details = res;
      },
      err => {
        this.toastr.errorToastr(err);
      });
    }
  }

  addIcdDetails(id: number, code: string, desc: string,chargeAmount:number=0){
    this.formGroup = this.fb.group({
      id: id,
      code: code,
      desc: desc,
      chargeAmount:chargeAmount
    });
    this.arrayCriteria.emit(this.formGroup);
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
