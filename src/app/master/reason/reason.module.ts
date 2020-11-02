import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ReasonComponent } from './reason.component';
import { ReasoncRoutingModule } from './reason-routing.module';
import { CreateNewReasonComponent } from './create-new-reason/create-new-reason.component';
import{ReasonMasterService} from './../../services/reason-master.service';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [ReasonComponent, CreateNewReasonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReasoncRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CoreModule
  ],
  providers:[ReasonMasterService],
  exports: [ReasonComponent]
})
export class ReasonModule { }
