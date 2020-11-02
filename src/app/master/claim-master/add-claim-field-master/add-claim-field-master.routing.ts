import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AddClaimFieldMasterComponent } from './add-claim-field-master.component';

const routes: Routes = [
  
  {path:'', component: AddClaimFieldMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewClaimFieldMasterRoutingModule { }
