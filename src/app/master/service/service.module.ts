import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ServiceComponent } from './service.component';
import { ServiceRoutingModule } from './service-routing.module';
//import { CreateNewServiceComponent } from './create-new-service/create-new-service.component';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [ServiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ServiceRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    CoreModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [ServiceComponent]
})
export class ServiceModule { }
