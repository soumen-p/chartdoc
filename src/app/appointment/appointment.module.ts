import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule ,
    NgbModule
  ],
  providers:[AppointmentService],
  exports: [AppointmentComponent]
})
export class AppointmentModule { }
