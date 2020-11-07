import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { PatientSearchComponent } from './patient-search.component';
import { PatientSearchService } from '../services/patient-search.service';
import { PatientSearchRoutingModule } from './patient-search-routing.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


@NgModule({
  declarations: [PatientSearchComponent],
  imports: [
    CommonModule,
    CoreModule,
    PatientSearchRoutingModule,
    ButtonsModule
  ],
  exports:[PatientSearchComponent],
  providers: [PatientSearchService]
})
export class PatientSearchModule { }
