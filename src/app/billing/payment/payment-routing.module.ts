
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PaymentComponent} from './payment.component';
import {PaymentService} from '../../services/payment.service';
const paymentRoutes: Routes = [
  {path:'', component: PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(paymentRoutes)],
  exports: [RouterModule],
  providers: [PaymentService]
})


export class PaymentRoutingModule { }