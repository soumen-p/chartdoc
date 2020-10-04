import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EobComponent } from './eob.component';
import {EobRoutingModule} from './eob-routing.module';
import { ShellModule } from 'src/app/shell/shell.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EobComponent],
  imports: [
    CommonModule,
    EobRoutingModule,
    ReactiveFormsModule,
    ShellModule
  ]
})
export class EobModule { }
