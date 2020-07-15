import { Component, OnInit, OnDestroy } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Subscription } from 'rxjs';
import { PatientImpressionPlanService } from 'src/app/services/patient-impression-plan.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/core/shared.service';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-patient-impression-plan',
  templateUrl: './patient-impression-plan.component.html',
  styleUrls: ['./patient-impression-plan.component.css']
})
export class PatientImpressionPlanComponent implements OnInit, OnDestroy {

  public Editor = DecoupledEditor;
  public ckEditorContent: string;
  flag: string;
  dataDefault: any;
  patientId: string;
  formImpressionPlan: FormGroup;
  isPosCheckout = false;

  constructor(private sharedService: SharedService,
              private patientImpressionPlanService: PatientImpressionPlanService, public toastr: ToastrManager) {
    this.ckEditorContent = '';
  }

  ngOnDestroy() {
  }
  ngOnInit() {
    const doctorBookingInfo = this.sharedService.getBookingInfo('doctorBookingInfo');
    if (doctorBookingInfo != null && doctorBookingInfo.positionID !== 'undefined' && doctorBookingInfo.positionID === '-3') {
      this.isPosCheckout = true;
    }

    this.patientId = this.sharedService.getLocalItem('patientInfo').appointmentId;
    this.flag = this.sharedService.getLocalItem('patientInfo').flag;
    if (!isNullOrEmptyString(this.sharedService.getLocalItem('impressionPlan' + this.patientId))) {
      this.ckEditorContent = this.sharedService.getLocalItem('impressionPlan' + this.patientId);
    } else {
      this.patientImpressionPlanService.getPatientImpressionplan(this.patientId, this.flag)
        .subscribe((res) => {
          if (res !== null && res.length > 0) {
            this.ckEditorContent = res[0].description;
          }
        });
    }

    this.formImpressionPlan = new FormGroup({
      patientId: new FormControl(),
      description: new FormControl()
    });

  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
    );
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.sharedService.setLocalItem('impressionPlan' + this.patientId, data);
  }
  public saveImpressionPlan() {

    this.formImpressionPlan.setValue({
      description: this.ckEditorContent,
      patientId: this.patientId
    });

    this.patientImpressionPlanService.saveImpressionPlan(this.formImpressionPlan.value).subscribe
      (
        data => {
          if (data === '1') {
            this.toastr.successToastr('Operation Successful');
          } else {
            this.toastr.successToastr('Operation Unsuccessful');
          }
        }
      );
  }
}
