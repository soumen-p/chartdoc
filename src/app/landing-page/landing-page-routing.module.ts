import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';


const landingPageRoutes: Routes = [
    {path:'landing-page', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(landingPageRoutes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
