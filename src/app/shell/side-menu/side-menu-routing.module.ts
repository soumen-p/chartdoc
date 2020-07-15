import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu.component';


const sideMenuRoutes: Routes = [
    {path:'', component: SideMenuComponent}
];

@NgModule({
  imports: [RouterModule.forChild(sideMenuRoutes)],
  exports: [RouterModule]
})
export class SideMenuRoutingModule { }
