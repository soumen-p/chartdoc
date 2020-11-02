import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateBillComponent } from './create-bill.component';
import {CreateBillRoutingModule } from './create-bill-routing.module'
import { CreateBillService } from '../../services/create-bill.service';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [CreateBillComponent],
  imports: [
    CommonModule,
    CoreModule,
    CreateBillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[CreateBillService],
   exports: [CreateBillComponent]
})
export class CreateBillModule { }
