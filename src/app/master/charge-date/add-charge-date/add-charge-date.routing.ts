import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddChargeDateComponent } from './add-charge-date.component';

const routes: Routes = [
  
  {path:'', component: AddChargeDateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewChargeDateRoutingModule { }
