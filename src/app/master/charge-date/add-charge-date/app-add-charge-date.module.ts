import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddChargeDateComponent } from './add-charge-date.component';
import { NewChargeDateRoutingModule } from './add-charge-date.routing'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../../../core/core.module';
@NgModule({
  declarations: [ AddChargeDateComponent],
  imports: [
    CommonModule,
    NewChargeDateRoutingModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [AddChargeDateComponent]
})
export class NewhargeDateModule { }
