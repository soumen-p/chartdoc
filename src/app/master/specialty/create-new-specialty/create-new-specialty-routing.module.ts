import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewSpecialtyComponent } from './create-new-specialty.component';
const servicecalendarRoutes: Routes = [
  
  { path: '', component: CreateNewSpecialtyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(servicecalendarRoutes)],
  exports: [RouterModule]
})
export class NewSpecialtyRoutingModule { }
