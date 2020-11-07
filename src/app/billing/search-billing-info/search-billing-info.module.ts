import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBillingInfoComponent } from './search-billing-info.component';
import { SearchBillingRoutingModule } from './search-billing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SearchBillingInfoComponent],
  imports: [
    CommonModule,
    SearchBillingRoutingModule,
    ReactiveFormsModule
  ]
})
export class SearchBillingInfoModule { }
