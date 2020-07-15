import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientProceduresService } from '../../services/patient-procedures.service';
import { Subscription } from 'rxjs';
import { PatientProcedures } from 'src/app/models/patient-procedures';
import { DatePipe } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { Document } from 'src/app/models/document.model';

@Component({
  selector: 'app-patient-procedures',
  templateUrl: './patient-procedures.component.html',
  styleUrls: ['./patient-procedures.component.css']
})
export class PatientProceduresComponent implements OnInit, OnDestroy {
  data: any;
  procedureDocument: Array<Document> = [];
  isViewByDate = true;
  apiSubscription: Subscription;
  proceduresEntry: Array<PatientProcedures> = [];
  patientId: string;
  pipe = new DatePipe('en-US'); // Use your own locale
  value = 0;
  flag: string;
  isPosCheckout = false;
  constructor(private ProcedureService: PatientProceduresService) { }
  ngOnDestroy() {
  }
  ngOnInit() {
    this.loadInit();
  }
  loadInit() {
    const doctorBookingInfo = this.ProcedureService.getBookingInfo('doctorBookingInfo');
    // tslint:disable-next-line: triple-equals
    if (doctorBookingInfo != null && doctorBookingInfo.positionID != 'undefined' && doctorBookingInfo.positionID == '-3') {
      // alert(doctorBookingInfo.positionID);
      this.isPosCheckout = true;
    }

    this.patientId = this.ProcedureService.getPatientDetails('patientInfo').patientId;
    this.flag = this.ProcedureService.getPatientDetails('patientInfo').flag;

    this.apiSubscription = this.ProcedureService.GetPatientProcedures(this.patientId, this.flag)
      .subscribe((res) => {
        // tslint:disable-next-line: triple-equals
        if (this.flag == 'E') {
          res.entry.forEach(element => {
            this.proceduresEntry.push(
              {
                performedDateTime: this.pipe.transform(new Date(element.resource.performedDateTime), 'MMM dd,yyyy'),
                procedureName: element.resource.code.text,
                // tslint:disable-next-line: max-line-length
                doctorName: this.value === 0 ? 'Dr.June Abigail' : (this.value === 1 ? 'Dr. Benjamin Dartmoth' : (this.value === 2 ? 'Dr. Sanjay Gupta' : (this.value === 3 ? 'Dr. Susan Mendenhall' : 'Dr. Michael Svenson'))),
                // tslint:disable-next-line: max-line-length
                doctorProfile: this.value === 0 ? 'Oncologist' : (this.value === 1 ? 'Cardiologist' : (this.value === 2 ? 'Gastroentologist' : (this.value === 3 ? 'Primary Care Physician' : 'Cardiologist'))),
                id: 0
              });
            this.value++;
          });
        } else {
          res.forEach(item => {
            this.proceduresEntry.push(
              {
                performedDateTime: this.pipe.transform(new Date(item.procedureDate), 'MMM dd,yyyy'),
                procedureName: item.procedureDesc,
                doctorName: item.drName,
                doctorProfile: item.drProfile,
                id: item.id
              });
            this.value++;
          });
        }
        this.ProcedureService.setProcedureDetails('procedures' + this.patientId, this.proceduresEntry);
        if(this.proceduresEntry.length>0){
        this.getDocuments(this.proceduresEntry[0].id);
        }
      },
        err => {
          console.log(err);
        });
  }
  getDocuments(id: number) {
    this.ProcedureService.GetDocumentByPatientId(this.patientId, 'P', id).subscribe((data: Document[]) => {
      // tslint:disable-next-line: triple-equals
      if (this.flag == 'E') {
        this.procedureDocument.push({
          patientId: this.patientId,
          procDiagId: 0,
          fileName: 'Jason Argonaut.pdf',
          path: '../../../../assets/ProcedureDocuments/Jason Argonaut.pdf',
          documentType: 'P'
        });
      }  else {
        this.procedureDocument = data;
      }
      this.ProcedureService.setDocumentDetails('procedure-document' + this.patientId, this.procedureDocument);
    });
  }
  ChangeProcedureView(value: string) {
    // tslint:disable-next-line: triple-equals
    if (value == 'DATE') {
      this.isViewByDate = true;
    } else {
      this.isViewByDate = false;
    }
  }
  LoadProcedureDocuments(id: number) {
    this.getDocuments(id);
  }
  openModelProcedure(myModal: string) {
    document.getElementById(myModal).style.display = 'block';
  }
  downloadFile() {
    this.procedureDocument.forEach(item => {
      const link = document.createElement('a');
      link.download = item.fileName;
      link.href = item.path;
      link.click();
      link.remove();
    });
  }
}
