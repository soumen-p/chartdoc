import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorCalenderComponent } from './doctor-calender.component';


const doctorcalendarRoutes: Routes = [
    {path:'doctor-calendar', component: DoctorCalenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(doctorcalendarRoutes)],
  exports: [RouterModule]
})
export class DoctorCalendarRoutingModule { }
