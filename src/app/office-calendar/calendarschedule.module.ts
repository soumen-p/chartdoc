import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { CalendarScheduleRoutingModule } from './calendarschedule.routing.module';
import {CalendarScheduleComponent} from './calendarschedule.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OfficeCalendarService} from '../services/officecalendar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [CalendarScheduleComponent],
  imports: [
    CommonModule,
    CalendarScheduleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot()
  ],
  providers:[AppointmentService,OfficeCalendarService],
  exports: [CalendarScheduleComponent]
})
export class CalendarscheduleModule { }
