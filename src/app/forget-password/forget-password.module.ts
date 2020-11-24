import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';



@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [
    CommonModule,
    CoreModule,
    ForgetPasswordRoutingModule
  ],
  exports: [ForgetPasswordComponent]
})
export class ForgetPasswordModule { }
