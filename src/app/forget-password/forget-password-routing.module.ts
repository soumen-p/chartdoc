import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password.component';


const forgetPasswordRoutes: Routes = [
    {path:'', component: ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(forgetPasswordRoutes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule { }


