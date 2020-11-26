import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MfaComponent } from './mfa.component';


const mfaRoutes: Routes = [
    {path:'', component: MfaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(mfaRoutes)],
  exports: [RouterModule]
})
export class MfaRoutingModule { }


