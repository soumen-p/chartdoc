import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientFlowSheetComponent } from './patient-flow-sheet.component';


const flowSheetRoutes: Routes = [
    {path:'patient-flow-sheet', component: PatientFlowSheetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(flowSheetRoutes)],
  exports: [RouterModule]
})
export class PatientFlowSheetRoutingModule { }