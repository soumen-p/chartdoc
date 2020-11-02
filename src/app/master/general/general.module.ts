import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';

import { CoreModule } from '../../core/core.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    CoreModule,
    GeneralRoutingModule,
    FormsModule
  ]
})
export class GeneralModule { }
