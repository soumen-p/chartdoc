import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptcopayComponent } from './accept-copay.component';


const acceptcopayRoutes: Routes = [
    {path:'', component: AcceptcopayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(acceptcopayRoutes)],
  exports: [RouterModule]
})
export class AcceptcopayRoutingModule { }
