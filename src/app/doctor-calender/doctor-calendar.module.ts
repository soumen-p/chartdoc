import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OfficeCalendarService} from '../services/officecalendar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DoctorCalenderComponent } from './doctor-calender.component';
import { DoctorCalendarRoutingModule } from './doctor-calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [DoctorCalenderComponent],
  imports: [
    CommonModule,
    DoctorCalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [DoctorCalenderComponent]
})
export class DoctorCalendarModule { }
