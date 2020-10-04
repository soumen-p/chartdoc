import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { CreateNewRoleComponent } from './create-new-role/create-new-role.component';
const RoleRoutes: Routes = [
  { path: 'app-role', component: RoleComponent },
  { path: 'new-role', component: CreateNewRoleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(RoleRoutes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
