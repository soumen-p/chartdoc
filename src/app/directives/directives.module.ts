import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyForDirective } from './lazy-for.directive';



@NgModule({
  declarations: [LazyForDirective],
  imports: [
    CommonModule
  ],
  exports: [LazyForDirective]
})
export class DirectivesModule { }
