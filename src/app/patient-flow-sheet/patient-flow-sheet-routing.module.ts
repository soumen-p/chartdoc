import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientFlowSheetComponent } from './patient-flow-sheet.component';


const flowSheetRoutes: Routes = [
    {path:'', component: PatientFlowSheetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(flowSheetRoutes)],
  exports: [RouterModule]
})
export class PatientFlowSheetRoutingModule { }