import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';
import { SpecialtyComponent } from './specialty.component';
import { SpecialtyRoutingModule } from './specialty-routing.module';

import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [SpecialtyComponent],
  imports: [
    CommonModule,
    FormsModule,
    SpecialtyRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    CoreModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [SpecialtyComponent]
})
export class SpecialtyModule { }
