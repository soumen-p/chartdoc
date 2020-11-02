import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientOthersComponent } from './patient-others.component';


const patientOthersRoutes: Routes = [
  {path:'', component: PatientOthersComponent}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(patientOthersRoutes)],
  exports: [RouterModule]
})
export class PatientOthersRoutingModule { }
