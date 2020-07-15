import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeDateComponent } from './charge-date.component';
import { AddChargeDateComponent } from './add-charge-date/add-charge-date.component';
import { ChargeDateRoutingModule } from './charge-date-routing.module';
import { ShellModule } from 'src/app/shell/shell.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [ChargeDateComponent, AddChargeDateComponent],
  imports: [
    CommonModule,
    ChargeDateRoutingModule,
    ShellModule ,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [ChargeDateComponent,AddChargeDateComponent]
})
export class ChargeDateModule { }
