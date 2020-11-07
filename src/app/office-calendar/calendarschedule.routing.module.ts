import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CalendarScheduleComponent} from './calendarschedule.component';

const calendarScheduleRoutes: Routes = [
 
    {path:'', component: CalendarScheduleComponent}

];

@NgModule({
  imports: [RouterModule.forChild(calendarScheduleRoutes)],
  exports: [RouterModule]
})
export class CalendarScheduleRoutingModule { }
