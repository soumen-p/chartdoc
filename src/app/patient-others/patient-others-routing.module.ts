import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientOthersComponent } from './patient-others.component';


const patientOthersRoutes: Routes = [
  {path:'patient-others', component: PatientOthersComponent}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(patientOthersRoutes)],
  exports: [RouterModule]
})
export class PatientOthersRoutingModule { }
