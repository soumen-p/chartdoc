import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientOthersComponent } from './patient-others.component';
import { CoreModule } from '../core/core.module';
import { PatientOthersRoutingModule } from './patient-others-routing.module';
import { ShellModule } from '../shell/shell.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [PatientOthersComponent],
  imports: [
    CommonModule,
    CoreModule,
    PatientOthersRoutingModule,
    ShellModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ],
  exports: [PatientOthersComponent]
})
export class PatientOthersModule { }
