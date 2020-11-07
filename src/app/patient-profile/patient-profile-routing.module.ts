import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientProfileComponent } from './patient-profile.component';

const patientProfileRoutes: Routes = [
    { path:'', component: PatientProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(patientProfileRoutes)],
  exports: [RouterModule]
})
export class PatientProfileRoutingModule { }
