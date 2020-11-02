import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { OfficeCalendarRoutingModule } from './officecalendar-routing.module'
import { OfficeCalendarComponent } from './officecalendar.component';
import {CalendarScheduleComponent} from './calendarschedule.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OfficeCalendarService} from '../services/officecalendar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [OfficeCalendarComponent,CalendarScheduleComponent],
  imports: [
    CommonModule,
    OfficeCalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot()
  ],
  providers:[AppointmentService,OfficeCalendarService],
  exports: [OfficeCalendarComponent]
})
export class OfficeCalendarModule { }
