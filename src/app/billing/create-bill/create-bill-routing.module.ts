import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBillComponent } from './create-bill.component';


const createbillRoutes: Routes = [
  { path: '', component: CreateBillComponent },
];

@NgModule({
  imports: [RouterModule.forChild(createbillRoutes)],
  exports: [RouterModule]
})
export class CreateBillRoutingModule { }
