import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserComponent } from './manage-user.component';


const manageuserRoutes: Routes = [
    {path:'manage-user', component: ManageUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(manageuserRoutes)],
  exports: [RouterModule],
  
})
export class ManageUserRoutingModule { }