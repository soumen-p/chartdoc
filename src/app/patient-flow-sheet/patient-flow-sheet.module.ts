import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PatientFlowSheetComponent } from './patient-flow-sheet.component';
import { PatientFlowSheetRoutingModule } from './patient-flow-sheet-routing.module';
import { PatientFlowSheetService } from '../services/patient-flow-sheet.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PatientFlowSheetComponent],
  imports: [
    CommonModule,
    PatientFlowSheetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule ,
    NgbModule
  ],
  providers:[PatientFlowSheetService],
  exports: [PatientFlowSheetComponent]
})
export class PatientFlowSheetModule { }
