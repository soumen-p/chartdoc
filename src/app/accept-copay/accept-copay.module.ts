import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { AcceptcopayRoutingModule } from './accept-copay-routing.module';
import { AcceptcopayComponent } from './accept-copay.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AcceptcopayService } from '../services/accept-copay.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [AcceptcopayComponent],
  imports: [
    CommonModule,
    CoreModule,
    AcceptcopayRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    //BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers:[AcceptcopayService],
  exports: [AcceptcopayComponent]
})
export class AcceptcopayModule { }
