import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChargeDateComponent } from './charge-date.component';
import { AddChargeDateComponent } from './add-charge-date/add-charge-date.component';

const routes: Routes = [
  {path:'', component: ChargeDateComponent},
  {path:'app-add-charge-date', component: AddChargeDateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeDateRoutingModule { }
