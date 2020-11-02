
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PatientBalanceComponent} from './patient-balance.component';
import {ReportService} from '../../services/report.service';
const patientbalanceRoutes: Routes = [
  {path:'', component: PatientBalanceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(patientbalanceRoutes)],
  exports: [RouterModule],
  providers: [ReportService]
})


export class PatientBalanceRoutingModule { }