import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientProceduresService } from 'src/app/services/patient-procedures.service';
import { PatientProcedureupload } from '../../models/patient-Procedure-upload';
@Component({
  selector: 'app-patient-procedure-upload',
  templateUrl: './patient-procedure-upload.component.html',
  styleUrls: ['./patient-procedure-upload.component.css']
})
export class PatientProcedureUploadComponent implements OnInit {
  doctorName: string;
  procedureDate: any;
  procedureDesc: string;
  files: any[] = [];
  patientId: string;
  procFormGroup: FormGroup;
  formData: FormData;
  pipe = new DatePipe('en-US');
  AppointmentId: string;
  @Input() patienthisttory : boolean =true ;
  // tslint:disable-next-line: no-output-rename
  @Output('loadInit') loadInit: EventEmitter<any> = new EventEmitter();
  constructor(private ProcedureService: PatientProceduresService, public toastr: ToastrManager) { }
  ngOnInit() {
    const doctorBookingInfo = this.ProcedureService.getBookingInfo('doctorBookingInfo');
    this.patientId = doctorBookingInfo.patientId;
    this.AppointmentId = doctorBookingInfo.appointmentid;
    this.doctorName = doctorBookingInfo.doctorname.substring(0, doctorBookingInfo.doctorname.indexOf('(') - 1);

    this.procFormGroup = new FormGroup({
      doctorName: new FormControl(''),
      procedureDate: new FormControl(''),
      procedureDesc: new FormControl('')
    });
  }
  closeModelProcedure(myModal: string) {
    this.procFormGroup.get('procedureDate') .reset( );
    this.procFormGroup.get('procedureDesc') .reset( );
    document.getElementById(myModal).style.display = 'none';
  }
  SaveProcedureUpload(myModal: string) {
    this.formData = new FormData();
    const param: PatientProcedureupload = {
      // tslint:disable-next-line: no-string-literal
      drName : this.doctorName,
      // tslint:disable-next-line: no-string-literal
      procedureDate: this.pipe.transform(new Date(this.procFormGroup.controls['procedureDate'].value), 'MMM dd,yyyy'),
      // tslint:disable-next-line: no-string-literal
      procedureDesc: this.procFormGroup.controls['procedureDesc'].value,
      patientId: this.patientId,
      id: 0
    };
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.files.length; i++) {
      this.formData.append(this.files[i].name, this.files[i]);
    }
    this.formData.append('ProcUploadDetails', JSON.stringify(param));
    this.formData.append('AppointmentId', JSON.stringify(this.AppointmentId));
    this.ProcedureService.saveProcedureDetails(this.formData).subscribe(res => {
      const restatus = res.split('|');
      if (restatus[0] === '1') {
        this.toastr.successToastr('Document uploaded!', 'Success!');
      } else {
        this.toastr.errorToastr(restatus[1] + ' , please contact system admin!', 'Error!' + restatus[1]);
      }
      this.procFormGroup.get('procedureDate') .reset( );
      this.procFormGroup.get('procedureDesc') .reset( );
      document.getElementById(myModal).style.display = 'none';
      this.loadInit.emit();
    });
  }
}
