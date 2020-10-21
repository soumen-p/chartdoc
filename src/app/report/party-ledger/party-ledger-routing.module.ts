
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PartyLedgerComponent} from './party-ledger.component';
import {ReportService} from '../../services/report.service';
const partyledgerRoutes: Routes = [
  {path:'party-ledger', component: PartyLedgerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(partyledgerRoutes)],
  exports: [RouterModule],
  providers: [ReportService]
})


export class PartyLedgerRoutingModule { }