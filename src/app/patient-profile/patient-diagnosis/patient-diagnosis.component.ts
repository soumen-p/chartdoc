import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { PatientdiagnosisService } from '../../services/patientdiagnosis.service';
import { PatientDiagnosis } from 'src/app/models/patient-diagnosis';
import { Document } from 'src/app/models/document.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-patient-diagnosis',
  templateUrl: './patient-diagnosis.component.html',
  styleUrls: ['./patient-diagnosis.component.css']
})


export class PatientDiagnosisComponent implements OnInit, OnDestroy {
  diagnosisEntry: Array<PatientDiagnosis> = [];
  diagnosisDocument: Array<Document> = [];
  patientInfo: any;
  apiSubscription: Subscription;
  patientId: string;
  flag: string;
  pipe = new DatePipe('en-US'); // Use your own locale
  isPosCheckout = false;
  pageOfItems: Array<any>;
  @Input() patienthisttory : boolean =true ;
  constructor(private diagnosisService: PatientdiagnosisService) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.LoadInit();
  }
  LoadInit() {
    const doctorBookingInfo = this.diagnosisService.getBookingInfo('doctorBookingInfo');
    if (doctorBookingInfo != null && doctorBookingInfo.positionID !== 'undefined' && doctorBookingInfo.positionID === '-3') {
      this.isPosCheckout = true;
    }

    this.patientInfo = this.diagnosisService.getPatientDetails('patientInfo');
    this.flag = this.patientInfo.flag;
    this.patientId = this.patientInfo.patientId;
    this.apiSubscription = this.diagnosisService.getPatientDiagnosis(this.patientId, this.flag)
      .subscribe((res) => {
        this.diagnosisEntry = [];
        this.diagnosisEntry.length = 0;
        if (this.flag === 'E') {
          res.entry.forEach(element => {
            this.diagnosisEntry.push(
              {
                diagnosisDate: this.pipe.transform(new Date(element.resource.effectiveDateTime), 'MMM dd,yyyy'),
                diagnosisDesc: element.resource.code.text,
                patientId: this.patientId,
                id: 0
              });
          });
        } else {
          res.forEach(item => {
            this.diagnosisEntry.push(
              {
                diagnosisDate: this.pipe.transform(new Date(item.diagnosisDate), 'MMM dd,yyyy'),
                diagnosisDesc: item.diagnosisDesc,
                patientId: this.patientId,
                id: item.id
              }
            );
          });
        }
        this.diagnosisService.setDiagnosisDetails('diagnosis' + this.patientId, this.diagnosisEntry);
        if (this.diagnosisEntry.length > 0) {
          this.getDocuments(this.diagnosisEntry[0].id);
        }
      },
      err => {
        
      });
  }

  LoadDiagnosisDocuments(Id: number) {
    this.getDocuments(Id);
  }

  getDocuments(id: number) {
    this.diagnosisService.getDocumentByPatientId(this.patientId, 'D', id).subscribe((data: Document[]) => {
      if (this.flag === 'E') {
        this.diagnosisDocument.push({
          patientId: this.patientId,
          procDiagId: 0,
          fileName: 'Jason Argonaut.pdf',
          path: '../../../../assets/DiagnosisDocuments/Jason Argonaut.pdf',
          documentType: 'D'
        });
      } else {
        this.diagnosisDocument = data;
      }
    });
    this.diagnosisService.setDiagnosisDetails('diagnosis-document' + this.patientId, this.diagnosisDocument);
  }

  downloadFile() {
    this.diagnosisDocument.forEach(item => {
      const link = document.createElement('a');
      link.download = item.fileName;
      link.href = item.path;
      link.click();
      link.remove();
    });
  }

  openModelDiagnosis(myModal: string) {
    document.getElementById(myModal).style.display = 'block';

  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
