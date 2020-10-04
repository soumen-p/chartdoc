import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitClaimComponent } from './submit-claim.component';


const submitclaimRoutes: Routes = [
  { path: 'submit-claim', component: SubmitClaimComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(submitclaimRoutes)],
  exports: [RouterModule]
})
export class SubmitClaimRoutesRoutingModule { }
