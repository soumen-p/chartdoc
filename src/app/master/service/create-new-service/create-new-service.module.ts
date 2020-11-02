import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';
import{NewServiceRoutingModule} from './create-new-service.routing'
import { CreateNewServiceComponent } from './create-new-service.component';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [ CreateNewServiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    NewServiceRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    CoreModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [CreateNewServiceComponent]
})
export class NewServiceModule { }
