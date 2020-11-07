import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorCalenderComponent } from './doctor-calender.component';


const doctorcalendarRoutes: Routes = [
    {path:'', component: DoctorCalenderComponent},
    {path:'viewpatient-history', component: DoctorCalenderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(doctorcalendarRoutes)],
  exports: [RouterModule]
})
export class DoctorCalendarRoutingModule { }
