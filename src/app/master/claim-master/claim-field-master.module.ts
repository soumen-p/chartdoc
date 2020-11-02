

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFieldMasterComponent } from './claim-field-master.component';
import { AddClaimFieldMasterComponent } from './add-claim-field-master/add-claim-field-master.component';
import { ClaimFieldMasterRoutingModule } from './claim-field-master-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [ClaimFieldMasterComponent, AddClaimFieldMasterComponent],
  imports: [
    CommonModule,
    ClaimFieldMasterRoutingModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [ClaimFieldMasterComponent, AddClaimFieldMasterComponent]
})
export class ClaimFieldMasterModule { }
