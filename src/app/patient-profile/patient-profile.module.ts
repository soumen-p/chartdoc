import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientProfileComponent } from './patient-profile.component';
import { CoreModule } from '../core/core.module';
import { PatientProfileRoutingModule } from './patient-profile-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PatientChiefComplaintService } from '../services/patient-chief-complaint.service';
import { PatientCptService } from '../services/patient-cpt.service';
import { PatientdiagnosisService } from '../services/patientdiagnosis.service';
import { PatientEncounterService } from '../services/patient-encounter.service';
import { PatientFollowupService } from '../services/patient-followup.service';
import { PatientIcdService } from '../services/patient-icd.service';
import { CommonService } from '../core/common.service';
import { PatientImmunizationService } from '../services/patient-immunizations.service';
import { PatientInsuranceinfoService } from '../services/patient-insuranceinfo.service';
import { PatientProceduresService } from '../services/patient-procedures.service';
import { PatientProfileHeaderService } from '../services/patient-profile-header.service';
import { PatientSocialFamilyService } from '../services/patient-social-family.service';
import { PatientProfileHeaderComponent } from './patient-profile-header/patient-profile-header.component';
import { PatientSocialFamilyComponent } from './patient-social-family/patient-social-family.component';
import { PatientProceduresComponent } from './patient-procedures/patient-procedures.component';
import { PatientPrescriptionsViewComponent } from './patient-prescriptions-view/patient-prescriptions-view.component';
import { PatientPrescriptionsComponent } from './patient-prescriptions/patient-prescriptions.component';
import { PatientInsuranceInfoComponent } from './patient-insurance-info/patient-insurance-info.component';
import { PatientImpressionPlanComponent } from './patient-impression-plan/patient-impression-plan.component';
import { PatientImmunizationsComponent } from './patient-immunizations/patient-immunizations.component';
import { PatientIcdComponent } from './patient-icd/patient-icd.component';
import { PatientCptComponent } from './patient-cpt/patient-cpt.component';
import { PatientFollowUpComponent } from './patient-follow-up/patient-follow-up.component';
import { PatientEncounterComponent } from './patient-encounter/patient-encounter.component';
import { PatientDiagnosisComponent } from './patient-diagnosis/patient-diagnosis.component';
import { PatientChiefComplaintComponent } from './patient-chief-complaint/patient-chief-complaint.component';
import { PatientAllergiesComponent } from './patient-allergies/patient-allergies.component';
import { EmployeeFilterPipe } from '../services/employee-filter.pipe';
import { CPTEmployeeFilterPipe } from '../services/Cptemployee-filter.pipe';
import { EncounterFilterPipe } from '../services/encounter-filter.pipe';
import { PrescriptionSearchFilter } from '../services/PrescriptionSearch-filter.pipe';
import { PatientAllergiesService } from '../services/patient-allergies.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { LazyForModule } from 'angular-lazy-for';
import { SafePipe } from '../services/safe-html-pipe';
import { PatientdiagnosticuploadComponent } from './patientdiagnosticupload/patientdiagnosticupload.component';
import { PatientProcedureUploadComponent } from './patient-procedure-upload/patient-procedure-upload.component';
import { PatientVitalsHistoryComponent } from './patient-vitals-history/patient-vitals-history.component';


@NgModule({
  declarations: [PatientProfileComponent,
    PatientProfileHeaderComponent,
    PatientSocialFamilyComponent,
    PatientProceduresComponent,
    PatientPrescriptionsViewComponent,
    PatientPrescriptionsComponent,
    PatientInsuranceInfoComponent,
    PatientImpressionPlanComponent,
    PatientImmunizationsComponent,
    PatientIcdComponent,
    PatientCptComponent,
    PatientFollowUpComponent,
    PatientEncounterComponent,
    PatientDiagnosisComponent,
    PatientChiefComplaintComponent,
    PatientAllergiesComponent,
    EmployeeFilterPipe,
    CPTEmployeeFilterPipe,
    EncounterFilterPipe,
    PrescriptionSearchFilter,
    SafePipe,
    PatientdiagnosticuploadComponent,
    PatientProcedureUploadComponent,
    PatientVitalsHistoryComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    PatientProfileRoutingModule,
    CKEditorModule,
    FormsModule,
    GridModule,
    LazyForModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [PatientProfileComponent,
    PatientProfileHeaderComponent,
    PatientSocialFamilyComponent,
    PatientProceduresComponent,
    PatientPrescriptionsViewComponent,
    PatientPrescriptionsComponent,
    PatientInsuranceInfoComponent,
    PatientImpressionPlanComponent,
    PatientImmunizationsComponent,
    PatientIcdComponent,
    PatientCptComponent,
    PatientFollowUpComponent,
    PatientEncounterComponent,
    PatientDiagnosisComponent,
    PatientChiefComplaintComponent,
    PatientAllergiesComponent,
    EmployeeFilterPipe,
    CPTEmployeeFilterPipe,
    PrescriptionSearchFilter
  ],
  providers: [PatientAllergiesService,
    PatientChiefComplaintService,
    PatientCptService,
    PatientdiagnosisService,
    PatientEncounterService,
    PatientFollowupService,
    PatientIcdService,
    PatientImmunizationService,
    PatientProceduresService,
    PatientProfileHeaderService,
    PatientSocialFamilyService,
    PatientInsuranceinfoService,
    CommonService
  ]
})
export class PatientProfileModule { }
