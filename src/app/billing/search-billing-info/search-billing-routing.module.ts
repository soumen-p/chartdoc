import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchBillingInfoComponent } from './search-billing-info.component';

const billingRoutes: Routes = [
  { path: '', component: SearchBillingInfoComponent },
  { path: 'create-claim', component: SearchBillingInfoComponent },
  { path: 'manage-claim', component: SearchBillingInfoComponent },
  { path: 'resubmit-claim', component: SearchBillingInfoComponent },
  { path: 'create-eob', component: SearchBillingInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(billingRoutes)],
  exports: [RouterModule]
})
export class SearchBillingRoutingModule { }
