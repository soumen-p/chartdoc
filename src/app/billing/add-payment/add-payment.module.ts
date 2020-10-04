import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentComponent } from './add-payment.component';
import {AddPaymentRoutingModule} from './add-Payment-routing.module';
import { ShellModule } from 'src/app/shell/shell.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [AddPaymentComponent],
  imports: [
    CommonModule,
    AddPaymentRoutingModule,
    ReactiveFormsModule,
    ShellModule,
    FormsModule
  ]
})
export class AddPaymentModule { }
