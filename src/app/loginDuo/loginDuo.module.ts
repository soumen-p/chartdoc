import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { LoginDuoRoutingModule } from './loginDuo-routing.module';
import { LoginDuoComponent } from './loginDuo.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';


@NgModule({
  declarations: [LoginDuoComponent],
  imports: [
    CommonModule,
    LoginDuoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AuthenticationService],
  exports: [LoginDuoComponent]
})
export class LoginDuoModule { }