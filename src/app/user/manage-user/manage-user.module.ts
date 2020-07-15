import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShellModule } from '../../shell/shell.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageUserComponent } from './manage-user.component';
import { ManageUserRoutingModule } from './manage-user.routing.module';



@NgModule({
  declarations: [ManageUserComponent],
  imports: [
    CommonModule,
    ShellModule,
    ManageUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
 
  exports: [ManageUserComponent]
})
export class ManageUserModule { }
