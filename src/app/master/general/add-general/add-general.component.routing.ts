import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGeneralComponent } from './add-general.component';


const routes: Routes = [
 
  {path:'', component: AddGeneralComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewGeneralRoutingModule { }
