import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBillComponent } from './create-bill.component';


const createbillRoutes: Routes = [
  { path: 'create-bill', component: CreateBillComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(createbillRoutes)],
  exports: [RouterModule]
})
export class CreateBillRoutingModule { }
