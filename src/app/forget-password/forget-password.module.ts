import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';


@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [
    CommonModule,
    CoreModule,
    ForgetPasswordRoutingModule,

    RecaptchaModule, 
    RecaptchaFormsModule    
  ],
  exports: [ForgetPasswordComponent]
})
export class ForgetPasswordModule { }
