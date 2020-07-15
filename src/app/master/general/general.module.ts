import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { ShellModule } from 'src/app/shell/shell.module';
import { AddGeneralComponent } from './add-general/add-general.component';


@NgModule({
  declarations: [GeneralComponent, AddGeneralComponent],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    ShellModule 
  ]
})
export class GeneralModule { }
