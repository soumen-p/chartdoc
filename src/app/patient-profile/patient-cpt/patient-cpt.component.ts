import { Component, OnInit, Input } from '@angular/core';
import { PatientCptService } from '../../services/patient-cpt.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientCPTModel } from '../../models/PatientCPT.model';
import { isNullOrUndefined } from 'util';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';


const form = new FormGroup({
  id: new FormControl(),
  code: new FormControl(),
  desc: new FormControl()
});

@Component({
  selector: 'app-patient-cpt',
  templateUrl: './patient-cpt.component.html',
  styleUrls: ['./patient-cpt.component.css']
})
export class PatientCptComponent implements OnInit {
  cptCode: any;
  cptDesc: any;
  cptDetailss: PatientCPTModel[];
  public admin = false;
  public searchTerm: string;
  public tblVisibility = false;
  isIdExist: boolean;
  formCPT: FormGroup;
  patientInfo: [] = [];
  patientId: string;
  cptDetails: Array<PatientCPTModel> = [];
  frm: PatientCPTModel[] = [];
  public tblVisibilityOnLoad = false;
  isPosCheckOut = false;
  pageOfItems: Array<any>;
  @Input() patienthisttory: boolean = true;
  constructor(private patientCptService: PatientCptService, public toastr: ToastrManager) { }

  ngOnInit() {
    // tslint:disable-next-line: variable-name
    const _this = this;
    const doctorBookingInfo = this.patientCptService.getBookingInfo('doctorBookingInfo');
    // tslint:disable-next-line: triple-equals
    if (doctorBookingInfo != null && doctorBookingInfo.positionID != 'undefined' && doctorBookingInfo.positionID == '-3') {
      this.isPosCheckOut = true;
    }
    this.patientId = this.patientCptService.getPatientDetails('patientInfo').appointmentId;
    if (isNullOrUndefined(this.patientCptService.getAllCpt('AllCpt'))) {
      this.patientCptService.getPatientCptDetails()
        .subscribe((res) => {
          _this.cptDetailss = res;
          _this.patientCptService.setAllCpt('AllCpt', _this.cptDetailss);
        });
    } else {
      this.cptDetailss = this.patientCptService.getAllCpt('AllCpt');
    }
    this.tblVisibility = true;
    this.formCPT = new FormGroup({
      id: new FormControl(),
      patientId: new FormControl(),
      code: new FormControl(),
      desc: new FormControl()
    });

    if ((this.patientCptService.getCptDetailsByPatientId('cpt' + this.patientId)) == null
      // tslint:disable-next-line: triple-equals
      || (this.patientCptService.getCptDetailsByPatientId('cpt' + this.patientId)) == undefined) {
      this.patientCptService.getSavedCPT(this.patientId)
        .subscribe((data) => {
          _this.cptDetails = data;
          _this.patientCptService.setCptDetailsByPatientId('cpt' + _this.patientId, _this.cptDetails);
        });
    } else {
      this.cptDetails = this.patientCptService.getCptDetailsByPatientId('cpt' + this.patientId);
    }
  }

  AddCPTDetails(cptId: string, cptCode: string, cptDesc: string) {
    if (this.cptDetails.length == 0) {
      this.tblVisibility = true;
      form.patchValue({ id: cptId, code: cptCode, desc: cptDesc });

      this.isIdExist = false;
      this.cptDetails.forEach(element => {
        if (element.id === cptId) {
          this.isIdExist = true;
        }
      });

      if (!this.isIdExist) {
        this.cptDetails.push(form.value);
        this.patientCptService.setCptDetailsByPatientId('cpt' + this.patientId, this.cptDetails);
      }
    }else{
      this.toastr.warningToastr('Only one CPT requried..');
    }
  }

  deleteRow(cpt: PatientCPTModel) {
    const index: number = this.cptDetails.indexOf(cpt);
    this.cptDetails.splice(index, 1);
    if (this.cptDetails.length < 1) {
      this.tblVisibility = false;
    }
  }

  public saveCptDetails(e: Event) {
    e.preventDefault();
    while (this.frm.length) {
      this.frm.pop();
    }
    this.cptDetails.forEach(item => {
      this.formCPT.patchValue({
        code: item.code,
        desc: item.desc,
        patientId: this.patientId,
        id: item.id
      });
      this.frm.push(this.formCPT.value);
    });

    this.patientCptService.saveCptDetails(this.frm)
      .subscribe(
        data => {
          if (data > 0) {
            this.patientCptService.setCptDetailsByPatientId('cpt' + this.patientId, this.cptDetails);
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

