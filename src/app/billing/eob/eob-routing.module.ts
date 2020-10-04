import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {EobComponent} from './eob.component';
import {EobService} from '../../services/eob.service';
const eobRoutes: Routes = [
  {path:'eob-edit', component: EobComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(eobRoutes)],
  exports: [RouterModule],
  providers: [EobService]
})


export class EobRoutingModule { }
