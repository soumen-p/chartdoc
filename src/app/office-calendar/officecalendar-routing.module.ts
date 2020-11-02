import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeCalendarComponent } from './officecalendar.component';
import {CalendarScheduleComponent} from './calendarschedule.component';

const officecalendarRoutes: Routes = [
 
    {path:'', component: CalendarScheduleComponent},
    {path:'office-calendar', component: OfficeCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(officecalendarRoutes)],
  exports: [RouterModule]
})
export class OfficeCalendarRoutingModule { }
