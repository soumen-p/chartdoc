import { Component, OnInit, OnDestroy } from '@angular/core';
import {PatientEncounterService} from '../../services/patient-encounter.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { encodeBase64 } from '@progress/kendo-file-saver';
import { Encountermodel } from 'src/app/models/encountermodel';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-patient-encounter',
  templateUrl: './patient-encounter.component.html',
  styleUrls: ['./patient-encounter.component.css']
})
export class PatientEncounterComponent implements OnInit , OnDestroy {
  // Encounters: string[];
  formEncounter: FormGroup;
  public searchString: string;
  encounNotes = '';
  patientInfo: any;
  doctorId: number;
  patientId: string;
  appointmentId: string;
  commonsubScription: Subscription;
  apisubScription: Subscription;

  encModel: Array<Encountermodel> = [];
  pipe = new DatePipe('en-US'); // Use your own locale
  isPosCheckOut = false;

  encounterSummary = '';

  ngOnInit() {
   }
   ngOnDestroy() {
  }
  constructor(private encounterService: PatientEncounterService, public toastr: ToastrManager) {
    this.encModel = [];

    this.patientInfo = this.encounterService.getPatientDetails('patientInfo');
    this.patientId = this.patientInfo.patientId;
    this.appointmentId = this.patientInfo.appointmentId;
   // alert("appointmentId="+this.AppointmentId)
    this.doctorId = this.encounterService.getDoctorDetails('doctorInfo').doctorId;

    const doctorBookingInfo = this.encounterService.getBookingInfo('doctorBookingInfo');
    if (doctorBookingInfo != null && doctorBookingInfo.positionID != 'undefined' && doctorBookingInfo.positionID == '-3') {
      this.isPosCheckOut = true;
    }

    this.formEncounter = new FormGroup({
      encounterNote: new FormControl('')  ,
      summary: new FormControl(''),
      patientId: new FormControl(''),
      doctorId: new FormControl('')
    });

    this.loadEncounters();

    this.formEncounter.get('encounterNote')
    .setValue(this.encounterService.getEncounterNote('encounterNote' + this.doctorId + this.appointmentId));
  }

  UsePreviousNote(Notes: string, summary: string) {
    this.encounterSummary = summary;
    this.formEncounter.get('encounterNote').setValue(summary + '\n\n' + Notes);
    this.encounterService.setEncounterNote('encounterNote' + this.doctorId + this.appointmentId, Notes);
    this.encounNotes = summary + '\n\n' + Notes;
  }

  submitEncounterSummary(encounterSummary: string, myModal: string) {
    document.getElementById(myModal).style.display = 'none';
    this.formEncounter.setValue({
        encounterNote: this.encounterService.getEncounterNote('encounterNote' + this.doctorId + this.appointmentId),
        summary: encounterSummary,
        patientId: this.appointmentId,
        doctorId: this.doctorId
      }
    );

    this.encounterService.saveEncounter(this.formEncounter.value).subscribe
    (
      data => {
        this.encounterService.removeLocalEncounter('encounterNote' + this.doctorId + this.appointmentId);
        this.encModel = [];
        this.loadEncounters();
        this.formEncounter.get('encounterNote').setValue('');
        this.toastr.successToastr('Operation Successful');
      }
    );
    this.encounterSummary = '';
  }

  UpdateEncounterNotes(value: string) {
    this.encounterService.setEncounterNote('encounterNote' + this.doctorId + this.appointmentId, value);
  }

  public OpenEncounterSummary(myModal: string) {
    document.getElementById(myModal).style.display = 'block';
  }

  public closeEncounterSummary(myModal: string) {
    document.getElementById(myModal).style.display = 'none';
  }

loadEncounters() {
    // tslint:disable-next-line: variable-name
    const _this = this;
    this.apisubScription = this.encounterService.GetPatientEncounters(this.patientId)
    .subscribe((res) => {
      res.forEach(element => {
        _this.encModel.push(
      {
        encounterDate: this.pipe.transform(new Date(element.encounterDate), 'MMM dd,yyyy'),
        summary: element.summary,
        name: element.name,
        encounterNote: element.encounterNote,
        id: element.id
      });
    });

  },
  err => {
    console.log(err);
  });

    console.log(this.encModel);
}

}
