import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientCreateComponent } from './patient-create.component';
import { CoreModule } from '../core/core.module';
import { PatientCreateRoutingModule } from './patient-create-routing.module';
import { ShellModule } from '../shell/shell.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PatientCreateComponent],
  imports: [
    CommonModule,
    CoreModule,
    PatientCreateRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PatientCreateComponent]
})
export class PatientCreateModule { }
