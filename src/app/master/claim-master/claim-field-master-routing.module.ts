import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ClaimFieldMasterComponent } from './claim-field-master.component';
import { AddClaimFieldMasterComponent } from './add-claim-field-master/add-claim-field-master.component';

const routes: Routes = [
  {path:'app-claim-field-master', component: ClaimFieldMasterComponent},
  {path:'app-add-claim-field-master', component: AddClaimFieldMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimFieldMasterRoutingModule { }
