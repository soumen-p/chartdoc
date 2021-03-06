import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { CreateNewServiceComponent } from './create-new-service/create-new-service.component';
const servicecalendarRoutes: Routes = [
  { path: 'app-service', component: ServiceComponent },
  { path: 'new-service', component: CreateNewServiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(servicecalendarRoutes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
