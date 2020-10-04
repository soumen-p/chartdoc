import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialtyComponent } from './specialty.component';
import { CreateNewSpecialtyComponent } from './create-new-specialty/create-new-specialty.component';
const servicecalendarRoutes: Routes = [
  { path: 'app-specialty', component: SpecialtyComponent },
  { path: 'new-specialty', component: CreateNewSpecialtyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(servicecalendarRoutes)],
  exports: [RouterModule]
})
export class SpecialtyRoutingModule { }
