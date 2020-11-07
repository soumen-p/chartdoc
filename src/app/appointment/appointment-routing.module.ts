import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';


const appointmentRoutes: Routes = [
    {path:'', component: AppointmentComponent},
    {path:'appointment-search', component: AppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appointmentRoutes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
