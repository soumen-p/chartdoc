import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {BookAppointmentComponent} from './book-appointment.component';

const bookAppointmentRoutes: Routes = [
  {path:'', component: BookAppointmentComponent},
  {path:'flowsheet-book-appointment', component: BookAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(bookAppointmentRoutes)],
  exports: [RouterModule]
})
export class BookAppointmentRoutingModule { }
