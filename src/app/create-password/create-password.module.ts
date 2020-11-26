import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { CreatePasswordRoutingModule } from './create-password-routing.module';
import { CreatePasswordComponent } from './create-password.component';


@NgModule({
  declarations: [CreatePasswordComponent],
  imports: [
    CommonModule,
    CoreModule,
    CreatePasswordRoutingModule
  ],
  exports: [CreatePasswordComponent]
})
export class CreatePasswordModule { }
