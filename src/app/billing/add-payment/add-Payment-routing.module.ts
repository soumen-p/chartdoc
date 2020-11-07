import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AddPaymentComponent} from './add-payment.component';
import {PaymentService} from '../../services/payment.service';
const addPaymentRoutes: Routes = [
  {path:'', component: AddPaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(addPaymentRoutes)],
  exports: [RouterModule],
  providers: [PaymentService]
})


export class AddPaymentRoutingModule { }
