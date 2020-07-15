import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    LandingPageRoutingModule
  ],
  exports: [LandingPageComponent]
})
export class LandingPageModule { }
