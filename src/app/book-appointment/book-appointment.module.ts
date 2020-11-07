import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '@angular/common';
import { BookAppointmentRoutingModule } from './book-appointment-routing.module';
import { BookAppointmentComponent } from './book-appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Datepicker module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OnlyNumber } from '../directives/number.directive';
@NgModule({
  declarations: [BookAppointmentComponent,OnlyNumber],
  imports: [
    CommonModule,
    CoreModule,
    BookAppointmentRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class BookAppointmentModule { }
