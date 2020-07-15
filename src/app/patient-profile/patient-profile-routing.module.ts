import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientProfileComponent } from './patient-profile.component';
import { PatientAllergiesComponent } from './patient-allergies/patient-allergies.component';
import { PatientChiefComplaintComponent } from './patient-chief-complaint/patient-chief-complaint.component';
import { PatientCptComponent } from './patient-cpt/patient-cpt.component';
import { PatientDiagnosisComponent } from './patient-diagnosis/patient-diagnosis.component';
import { PatientEncounterComponent } from './patient-encounter/patient-encounter.component';
import { PatientFollowUpComponent } from './patient-follow-up/patient-follow-up.component';
import { PatientIcdComponent } from './patient-icd/patient-icd.component';
import { PatientImmunizationsComponent } from './patient-immunizations/patient-immunizations.component';
import { PatientImpressionPlanComponent } from './patient-impression-plan/patient-impression-plan.component';
import { PatientInsuranceInfoComponent } from './patient-insurance-info/patient-insurance-info.component';
import { PatientPrescriptionsComponent } from './patient-prescriptions/patient-prescriptions.component';
import { PatientPrescriptionsViewComponent } from './patient-prescriptions-view/patient-prescriptions-view.component';
import { PatientProceduresComponent } from './patient-procedures/patient-procedures.component';
import { PatientProfileHeaderComponent } from './patient-profile-header/patient-profile-header.component';
import { PatientSocialFamilyComponent } from './patient-social-family/patient-social-family.component';

const patientProfileRoutes: Routes = [
    { path:'patient-profile', component: PatientProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(patientProfileRoutes)],
  exports: [RouterModule]
})
export class PatientProfileRoutingModule { }
