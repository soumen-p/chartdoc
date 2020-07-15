import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeComponent } from './charge.component';
import { ChargeRoutingModule } from './charge-routing.module';
import { ShellModule } from 'src/app/shell/shell.module';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {PatientProfileModule} from '../../patient-profile/patient-profile.module'
@NgModule({
  declarations: [ChargeComponent],
  imports: [
    CommonModule,
    ChargeRoutingModule,
    ShellModule ,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    PatientProfileModule
  ]
})
export class ChargeModule { }
