import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitClaimComponent } from './submit-claim.component';


const submitclaimRoutes: Routes = [
  { path: '', component: SubmitClaimComponent },
];

@NgModule({
  imports: [RouterModule.forChild(submitclaimRoutes)],
  exports: [RouterModule]
})
export class SubmitClaimRoutesRoutingModule { }
