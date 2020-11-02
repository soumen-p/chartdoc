import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeDateComponent } from './charge-date.component';

import { ChargeDateRoutingModule } from './charge-date-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [ChargeDateComponent],
  imports: [
    CommonModule,
    ChargeDateRoutingModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [ChargeDateComponent]
})
export class ChargeDateModule { }
