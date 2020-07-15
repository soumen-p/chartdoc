import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './general.component';
import { AddGeneralComponent } from './add-general/add-general.component';


const routes: Routes = [
  {path:'app-general', component: GeneralComponent},
  {path:'app-add-general', component: AddGeneralComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
