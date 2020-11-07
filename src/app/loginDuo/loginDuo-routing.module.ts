import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDuoComponent } from './loginDuo.component';


const loginDuoRoutes: Routes = [
    {path:'', component: LoginDuoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(loginDuoRoutes)],
  exports: [RouterModule]
})
export class LoginDuoRoutingModule { }
