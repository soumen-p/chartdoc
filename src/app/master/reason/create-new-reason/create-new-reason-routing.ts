import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewReasonComponent } from './create-new-reason.component';
const ReasoncalendarRoutes: Routes = [
 
  { path: '', component: CreateNewReasonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ReasoncalendarRoutes)],
  exports: [RouterModule]
})
export class NewReasoncRoutingModule { }
