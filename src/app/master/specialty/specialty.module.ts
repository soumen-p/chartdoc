import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';
import { SpecialtyComponent } from './specialty.component';
import { ShellModule } from 'src/app/shell/shell.module';
import { SpecialtyRoutingModule } from './specialty-routing.module';
import { CreateNewSpecialtyComponent } from './create-new-specialty/create-new-specialty.component';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [SpecialtyComponent, CreateNewSpecialtyComponent],
  imports: [
    CommonModule,
    ShellModule,
    FormsModule,
    SpecialtyRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    CoreModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [SpecialtyComponent]
})
export class SpecialtyModule { }
