import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';

import { NewSpecialtyRoutingModule } from './create-new-specialty-routing.module';
import { CreateNewSpecialtyComponent } from './create-new-specialty.component';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [ CreateNewSpecialtyComponent],
  imports: [
    CommonModule,
    FormsModule,
    NewSpecialtyRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    CoreModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [CreateNewSpecialtyComponent]
})
export class NewSpecialtyModule { }
