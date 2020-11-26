import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePasswordComponent } from './create-password.component';


const createPasswordRoutes: Routes = [
    {path:'', component: CreatePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(createPasswordRoutes)],
  exports: [RouterModule]
})
export class CreatePasswordRoutingModule { }


