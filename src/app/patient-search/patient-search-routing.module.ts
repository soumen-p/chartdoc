import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientSearchComponent } from './patient-search.component';


const patientSearchRoutes: Routes = [
    {path:'patient-search', component: PatientSearchComponent},
    {path:'patient-search-appointment', component: PatientSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(patientSearchRoutes)],
  exports: [RouterModule]
})
export class PatientSearchRoutingModule { }
