import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';

const RoleRoutes: Routes = [
  { path: '', component: RoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(RoleRoutes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
