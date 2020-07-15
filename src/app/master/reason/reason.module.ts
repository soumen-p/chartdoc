import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ReasonComponent } from './reason.component';
import { ShellModule } from 'src/app/shell/shell.module';
import { ReasoncRoutingModule } from './reason-routing.module';
import { CreateNewReasonComponent } from './create-new-reason/create-new-reason.component';
import{ReasonMasterService} from './../../services/reason-master.service';
@NgModule({
  declarations: [ReasonComponent, CreateNewReasonComponent],
  imports: [
    CommonModule,
    ShellModule,
    FormsModule,
    ReasoncRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers:[ReasonMasterService],
  exports: [ReasonComponent]
})
export class ReasonModule { }
