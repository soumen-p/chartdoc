import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptcopayComponent } from './accept-copay.component';


const acceptcopayRoutes: Routes = [
    {path:'accept-copay', component: AcceptcopayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(acceptcopayRoutes)],
  exports: [RouterModule]
})
export class AcceptcopayRoutingModule { }
