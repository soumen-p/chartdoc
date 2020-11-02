

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddClaimFieldMasterComponent } from './add-claim-field-master.component';
import { NewClaimFieldMasterRoutingModule } from './add-claim-field-master.routing'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../../../core/core.module';
@NgModule({
  declarations: [ AddClaimFieldMasterComponent],
  imports: [
    CommonModule,
    NewClaimFieldMasterRoutingModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [ AddClaimFieldMasterComponent]
})
export class NewClaimFieldMasterModule { }
