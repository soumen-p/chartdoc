import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { PatientChiefComplaintService } from '../../services/patient-chief-complaint.service';
import { FormGroup, FormControl } from '@angular/forms';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-patient-chief-complaint',
  templateUrl: './patient-chief-complaint.component.html',
  styleUrls: ['./patient-chief-complaint.component.css']
})
export class PatientChiefComplaintComponent implements OnInit {

  public Editor = DecoupledEditor;
  public ckEditorContent: string;
  tempCkeditorContent: string;
  dataDefault: any;
  patientId: string;
  commonSubscription: Subscription;
  apiSubscription: Subscription;
  ccValue: string;
  patientInfo: any;
  formCC: FormGroup;
  flag: string;
  isPosCheckOut : boolean = false;
  message: string;

  constructor(private cCService: PatientChiefComplaintService, public toastr: ToastrManager) {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
  }

  ngOnInit() {

    const doctorBookingInfo = this.cCService.getBookingInfo('doctorBookingInfo');
    // tslint:disable-next-line: triple-equals
    if (doctorBookingInfo != null && doctorBookingInfo.positionID != 'undefined' && doctorBookingInfo.positionID == '-3') {
      this.isPosCheckOut = true;
    }
    this.formCC = new FormGroup({
      pccDescription: new FormControl(''),
      PId: new FormControl('')
    });

    this.patientInfo = this.cCService.getPatientDetails('patientInfo');
    this.flag = this.patientInfo.flag;
    this.patientId = this.patientInfo.appointmentId;

    this.tempCkeditorContent = this.cCService.getChiefComplaintValue('cc' + this.patientId);

    // tslint:disable-next-line: variable-name
    const _this = this;
    if (isNullOrEmptyString(this.tempCkeditorContent)) {
      this.apiSubscription = this.cCService.getPatientCC(this.patientId, this.flag)
        .subscribe((res) => {
          if (res.length > 0) {
            _this.ckEditorContent = res[0].pccDescription;
          } else {
            _this.ckEditorContent = '';
          }
          _this.cCService.setChiefComplaintValue('cc' + _this.patientId, _this.ckEditorContent);
        });
    } else {
      this.ckEditorContent = this.tempCkeditorContent;
    }
  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
    );
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.cCService.setChiefComplaintValue('cc' + this.patientId, data);
  }
  public saveCc() {
    this.formCC.setValue({
      pccDescription: this.ckEditorContent,
      PId: this.patientId
    });

    this.cCService.saveCc(this.formCC.value).subscribe
      (
        data => {
          // tslint:disable-next-line: triple-equals
          if (data == '1') {
            this.toastr.successToastr('Operation Successful');
          } else {
            this.toastr.successToastr('Operation Unsuccessful');
          }
        }
      );
  }
}
