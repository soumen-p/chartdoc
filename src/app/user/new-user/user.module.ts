import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user.routing.module';
import { UserComponent } from './user.component';
import { OnlyNumber } from '../../directives/number.directive';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CoreModule
  ],
 
  exports: [UserComponent]
})
export class UserModule { }
