import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialtyComponent } from './specialty.component';

const servicecalendarRoutes: Routes = [
  { path: '', component: SpecialtyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(servicecalendarRoutes)],
  exports: [RouterModule]
})
export class SpecialtyRoutingModule { }
