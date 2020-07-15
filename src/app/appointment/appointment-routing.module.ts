import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';


const appointmentRoutes: Routes = [
    {path:'appointment', component: AppointmentComponent},
    {path:'appointment-search', component: AppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appointmentRoutes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
