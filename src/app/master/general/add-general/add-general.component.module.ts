import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGeneralRoutingModule } from './add-general.component.routing'

import { AddGeneralComponent } from './add-general.component';
import { CoreModule } from '../../../core/core.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ AddGeneralComponent],
  imports: [
    CommonModule,
    CoreModule,
    NewGeneralRoutingModule,
    FormsModule
  ]
})
export class NewGeneralModule { }
