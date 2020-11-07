
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PartyLedgerComponent} from './party-ledger.component';
import {ReportService} from '../../services/report.service';
const partyledgerRoutes: Routes = [
  {path:'', component: PartyLedgerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(partyledgerRoutes)],
  exports: [RouterModule],
  providers: [ReportService]
})


export class PartyLedgerRoutingModule { }