import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ClaimFieldMasterComponent } from './claim-field-master.component';


const routes: Routes = [
  {path:'', component: ClaimFieldMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimFieldMasterRoutingModule { }
