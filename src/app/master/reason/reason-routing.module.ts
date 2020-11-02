import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReasonComponent } from './reason.component';
import { CreateNewReasonComponent } from './create-new-reason/create-new-reason.component';
const ReasoncalendarRoutes: Routes = [
  { path: '', component: ReasonComponent },
  { path: 'new-reason', component: CreateNewReasonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ReasoncalendarRoutes)],
  exports: [RouterModule]
})
export class ReasoncRoutingModule { }
