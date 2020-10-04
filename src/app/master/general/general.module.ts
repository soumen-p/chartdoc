import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { ShellModule } from 'src/app/shell/shell.module';
import { AddGeneralComponent } from './add-general/add-general.component';
import { CoreModule } from '../../core/core.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [GeneralComponent, AddGeneralComponent],
  imports: [
    CommonModule,
    CoreModule,
    GeneralRoutingModule,
    ShellModule ,
    FormsModule
  ]
})
export class GeneralModule { }
