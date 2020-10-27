import { Component, OnInit, EventEmitter, Output,Input } from '@angular/core';
import { BookAppointmentService } from 'src/app/services/book-appointment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientDiagnosis } from 'src/app/models/patient-diagnosis';
import { PatientdiagnosisService } from 'src/app/services/patientdiagnosis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patientdiagnosticupload',
  templateUrl: './patientdiagnosticupload.component.html',
  styleUrls: ['./patientdiagnosticupload.component.css']
})
export class PatientdiagnosticuploadComponent implements OnInit {
  files: any[] = [];
  services = [];
  diagDate: any;
  service: any;
  diagFormGroup: FormGroup;
  formData: FormData;
  patientId: string;
  pipe = new DatePipe('en-US');
  // tslint:disable-next-line: no-output-rename
  @Output('LoadInit') LoadInit: EventEmitter<any> = new EventEmitter();
  @Input() patienthisttory : boolean =true ;
  constructor(private bookAppointmentService: BookAppointmentService,
              private diagnosisService: PatientdiagnosisService,
              public toastr: ToastrManager) { }

  ngOnInit() {
    this.getAllServices();
    this.patientId = this.diagnosisService.getPatientDetails('patientInfo').patientId;
    this.diagFormGroup = new FormGroup({
      diagDate: new FormControl(''),
      service: new FormControl('')
    });
  }
  onServiceChange(event) {
    this.service = event.target.options[event.target.options.selectedIndex].text;
  }

  SaveDiagUpload(myModal: string) {
    this.formData = new FormData();

    const param: PatientDiagnosis = {
      diagnosisDesc: this.service,
      diagnosisDate: this.pipe.transform(new Date(this.diagFormGroup.controls.diagDate.value), 'MMM dd,yyyy'),
      patientId: this.patientId,
      id: 0
    };

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.files.length; i++) {
      this.formData.append(this.files[i].name, this.files[i]);
    }

    this.formData.append('DiagUploadDetails', JSON.stringify(param));
    this.diagnosisService.saveDiagnosisDetails(this.formData).subscribe(res => {
      const restatus = res.split('|');
      if (restatus[0] === '1') {
        this.toastr.successToastr('Document uploaded!', 'Success!');
        this.diagnosisService.setDiagnosisDetails('diagnosis', param);
        this.diagnosisService.setDiagnosisDetails('diagnosis-document', this.formData.getAll);
      } else {
        this.toastr.errorToastr(restatus[1] + ' , please contact system admin!', 'Error!');
      }
      this.diagDate = '';
      this.diagFormGroup.get('service') .reset( );
      document.getElementById(myModal).style.display = 'none';
      this.LoadInit.emit();
    });
  }

  getAllServices() {
    this.bookAppointmentService.getAllServices()
      .subscribe((res) => {
        this.services = res;
        
      }, err => {
        
      });
  }

  closeModelDiagnosis(myModal: string) {
    this.diagDate = '';
    this.diagFormGroup.get('service') .reset( );
    document.getElementById(myModal).style.display = 'none';
  }
}
