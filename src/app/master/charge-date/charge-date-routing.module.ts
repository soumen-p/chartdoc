import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChargeDateComponent } from './charge-date.component';


const routes: Routes = [
  {path:'', component: ChargeDateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeDateRoutingModule { }
