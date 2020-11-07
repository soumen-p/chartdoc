import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewRoleComponent } from './create-new-role.component';
const RoleRoutes: Routes = [
 
  { path: '', component: CreateNewRoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(RoleRoutes)],
  exports: [RouterModule]
})
export class NewRoleRoutingModule { }
