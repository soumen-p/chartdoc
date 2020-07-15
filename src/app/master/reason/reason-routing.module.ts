import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReasonComponent } from './reason.component';
import { CreateNewReasonComponent } from './create-new-reason/create-new-reason.component';
const ReasoncalendarRoutes: Routes = [
  { path: 'app-reason', component: ReasonComponent },
  { path: 'new-reason', component: CreateNewReasonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ReasoncalendarRoutes)],
  exports: [RouterModule]
})
export class ReasoncRoutingModule { }
