import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientCreateComponent } from './patient-create.component';


const patientCreateRoutes: Routes = [
    {path:'patient-create', component: PatientCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(patientCreateRoutes)],
  exports: [RouterModule]
})
export class PatientCreateRoutingModule { }
