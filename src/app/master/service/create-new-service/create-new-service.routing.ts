import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewServiceComponent } from './create-new-service.component';
const newserviceRoutes: Routes = [
 
  { path: '', component: CreateNewServiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(newserviceRoutes)],
  exports: [RouterModule]
})
export class NewServiceRoutingModule { }
