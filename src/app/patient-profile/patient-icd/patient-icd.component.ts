import { Component, OnInit,Input } from '@angular/core';
import { PatientIcdService } from '../../services/patient-icd.service';
import { PatientICDModelEmployee } from '../../models/PatientICD.model';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/core/shared.service';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';


const form = new FormGroup({
  id: new FormControl(),
  code: new FormControl(),
  desc: new FormControl()
});

@Component({
  selector: 'app-patient-icd',
  templateUrl: './patient-icd.component.html',
  styleUrls: ['./patient-icd.component.css']
})
export class PatientIcdComponent implements OnInit {
  icdDetailss: PatientICDModelEmployee[]; // = [];
  icdId: number;
  icdCode: string;
  icdDesc: string;
  icdDetails: Array<PatientICDModelEmployee> = [];
  public searchTerm: string;
  public admin = false;
  public tblVisibility = false;
  public isVisibility = false;
  isIdExist: boolean;
  formIcd: FormGroup;
  patientInfo: [] = [];
  patientId: string;
  frm: PatientICDModelEmployee[] = [];
  icdGetSavedDetails: any;
  data: string;
  message: string;
  isPosCheckout = false;
  pageOfItems: Array<any>;
  @Input() patienthisttory : boolean =true ;
  constructor(private patientIcdService: PatientIcdService, public toastr: ToastrManager) {
  }

  ngOnInit() {
    const doctorBookingInfo = this.patientIcdService.getBookingInfo('doctorBookingInfo');
    if (doctorBookingInfo !== null && doctorBookingInfo.positionID !== 'undefined' && doctorBookingInfo.positionID === '-3') {
      this.isPosCheckout = true;
    }

    this.patientId = this.patientIcdService.getPatientDetails('patientInfo').appointmentId;
    if (!this.patientIcdService.getIcdDetails('icd' + this.patientId)) {
      this.patientIcdService.getPatientIcdDetails()
        .subscribe((res) => {
          this.icdDetailss = res;
          this.patientIcdService.setIcdDetails('icd' + this.patientId, this.icdDetailss);
        },
          err => {
            console.log(err);
          });
    } else {
      this.icdDetailss = this.patientIcdService.getIcdDetails('icd' + this.patientId);
    }

    this.tblVisibility = true;

    this.formIcd = new FormGroup({
      id: new FormControl(),
      patientId: new FormControl(),
      code: new FormControl(),
      desc: new FormControl()
    });

    this.patientIcdService.getSavedICD(this.patientId)
      .subscribe((data) => {
        this.icdDetails = data;
      },
        err => {
          console.log(err);
        });
  }

  searchText(value: string) {
    this.icdDetailss.filter(element => {
      // tslint:disable-next-line: no-unused-expression
      element.code.toLowerCase() === value.toLowerCase() || element.desc.toLowerCase() === value.toLowerCase();
    });
    this.data = this.patientIcdService.getDynamicHtml(this.icdDetailss);
  }

  AddIcdDetails(icdId: string, icdCode: string, icdDesc: string) {
    if ( this.icdDetails.length < 4) {
      this.tblVisibility = true;
      form.patchValue({ id: icdId, code: icdCode, desc: icdDesc });
      this.isIdExist = false;
      this.icdDetails.forEach(element => {
        if (element.id === icdId) {
          this.isIdExist = true;
        }
      });

      if (!this.isIdExist) {
        this.icdDetails.push(form.value);
      }
    } else {
      this.toastr.errorToastr('Maximum 4 ICD can be selected');
    }
  }

  deleteRow(icd: PatientICDModelEmployee) {
    const index: number = this.icdDetails.indexOf(icd);
    this.icdDetails.splice(index, 1);
    if (this.icdDetails.length < 1) {
      this.tblVisibility = false;
    }
  }

  public saveIcdDetails(e: Event) {
    e.preventDefault();
    while (this.frm.length) {
      this.frm.pop();
    }
    this.icdDetails.forEach(item => {
      this.formIcd.patchValue({
        code: item.code,
        desc: item.desc,
        patientId: this.patientId,
        id: item.id
      });
      this.frm.push(this.formIcd.value);
    });

    this.patientIcdService.saveIcdDetails(this.frm)
      .subscribe(
        data => {
          if (data > 0) {
            this.toastr.successToastr('Operation Successful');
          } else {
            this.toastr.successToastr('Operation Unsuccessful');
          }
        }
      );
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
