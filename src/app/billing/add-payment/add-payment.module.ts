import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentComponent } from './add-payment.component';
import {AddPaymentRoutingModule} from './add-Payment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [AddPaymentComponent],
  imports: [
    CommonModule,
    AddPaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddPaymentModule { }
