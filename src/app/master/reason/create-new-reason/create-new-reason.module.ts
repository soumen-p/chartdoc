import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';

import { NewReasoncRoutingModule } from './create-new-reason-routing'
import {CreateNewReasonComponent} from './create-new-reason.component'
import{ReasonMasterService} from './../../../services/reason-master.service';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
    declarations: [CreateNewReasonComponent],
    imports: [
      CommonModule,
      FormsModule,
      NewReasoncRoutingModule,
      ReactiveFormsModule,
      NgbModule,
      //BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      CoreModule
    ],
    providers:[ReasonMasterService],
    exports: [CreateNewReasonComponent]
  })
  export class NewReasonModule { }
