import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MfaRoutingModule } from './mfa-routing.module';
import { MfaComponent } from './mfa.component';


@NgModule({
  declarations: [MfaComponent],
  imports: [
    CommonModule,
    CoreModule,
    MfaRoutingModule
  ],
  exports: [MfaComponent]
})
export class MfaModule { }
