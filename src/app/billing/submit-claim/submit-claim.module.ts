import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubmitClaimComponent } from './submit-claim.component';
import {SubmitClaimRoutesRoutingModule } from './submit-claim-routing.module'
import { ShellModule } from 'src/app/shell/shell.module';
import { CreateBillService } from '../../services/create-bill.service';
import { CoreModule } from 'src/app/core/core.module';
import {FieldFilterPipe} from '../../services/fields-filter.pipe';

@NgModule({
    declarations: [SubmitClaimComponent,FieldFilterPipe],
    imports: [
      CommonModule,
      CoreModule,
      SubmitClaimRoutesRoutingModule,
      ShellModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    providers:[CreateBillService],
     exports: [SubmitClaimComponent]
  })
  export class SubmitClaimModule { }