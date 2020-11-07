import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientCreateComponent } from './patient-create.component';


const patientCreateRoutes: Routes = [
    {path:'', component: PatientCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(patientCreateRoutes)],
  exports: [RouterModule]
})
export class PatientCreateRoutingModule { }
