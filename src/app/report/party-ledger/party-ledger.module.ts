import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyLedgerComponent } from './party-ledger.component'
import {PartyLedgerRoutingModule} from './party-ledger-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PartyLedgerComponent],
  imports: [
    CommonModule,
    PartyLedgerRoutingModule,
    ReactiveFormsModule
  ]
})
export class PartyLedgerModule { }