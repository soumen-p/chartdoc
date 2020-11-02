import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import {PaymentRoutingModule} from './payment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }