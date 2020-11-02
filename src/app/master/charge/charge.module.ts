import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeComponent } from './charge.component';
import { ChargeRoutingModule } from './charge-routing.module';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {PatientProfileModule} from '../../patient-profile/patient-profile.module'
import { CptSearchFilterPipe } from 'src/app/services/cpt-search-filter.pipe';
import { ServiceMasterService } from 'src/app/services/service-master.service';

@NgModule({
  declarations: [ChargeComponent, CptSearchFilterPipe],
  imports: [
    CommonModule,
    ChargeRoutingModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    PatientProfileModule
  ],
  exports: [CptSearchFilterPipe, ChargeComponent],
  providers: [ServiceMasterService]
})
export class ChargeModule { }
