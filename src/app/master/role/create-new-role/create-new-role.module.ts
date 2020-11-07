import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FullCalendarModule } from '@fullcalendar/angular';

import { NewRoleRoutingModule } from './create-new-role.routing'
import { CreateNewRoleComponent } from './create-new-role.component';
import{RoleMasterService} from './../../../services/role-master.service';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [ CreateNewRoleComponent],
  imports: [
    CommonModule,
    FormsModule,
  
    ReactiveFormsModule,
    NewRoleRoutingModule,
    NgbModule,
    //BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CoreModule
  ],
  providers:[RoleMasterService],
  exports: [CreateNewRoleComponent]
})
export class NewRoleModule { }
