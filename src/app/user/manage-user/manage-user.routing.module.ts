import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserComponent } from './manage-user.component';


const manageuserRoutes: Routes = [
    {path:'', component: ManageUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(manageuserRoutes)],
  exports: [RouterModule],
  
})
export class ManageUserRoutingModule { }