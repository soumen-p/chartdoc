import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeCalendarComponent } from './officecalendar.component';
import {CalendarScheduleComponent} from './calendarschedule.component';

const officecalendarRoutes: Routes = [
    {path:'office-calendar', component: OfficeCalendarComponent},
    {path:'calendar-schedule', component: CalendarScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(officecalendarRoutes)],
  exports: [RouterModule]
})
export class OfficeCalendarRoutingModule { }
