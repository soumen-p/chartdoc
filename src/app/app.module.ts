import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CoreModule } from './core/core.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppComponent } from './app.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { PatientSearchModule } from './patient-search/patient-search.module';
import { LoginModule } from './login/login.module';
import { PatientProfileModule } from './patient-profile/patient-profile.module';
import { PatientCreateModule } from './patient-create/patient-create.module';
import { AppointmentModule } from './appointment/appointment.module'
import { DirectivesModule } from './directives/directives.module';
import { PatientFlowSheetModule } from './patient-flow-sheet/patient-flow-sheet.module';
import { BookAppointmentModule } from './book-appointment/book-appointment.module';
import {AcceptcopayModule} from './accept-copay/accept-copay.module'
import { OfficeCalendarModule } from './office-calendar/officecalendar.module';
import {PatientOthersModule} from './patient-others/patient-others.module'
import { ToastrModule } from 'ng6-toastr-notifications';
import { UserModule } from './user/new-user/user.module';
import { ManageUserModule } from './user/manage-user/manage-user.module';
import { DoctorCalendarModule } from './doctor-calender/doctor-calendar.module';
import { ServiceModule } from './master/service/service.module';
import { ReasonModule } from './master/reason/reason.module';
import { GeneralModule} from './master/general/general.module';
import { ChargeModule } from './master/charge/charge.module';
import { ChargeDateModule } from './master/charge-date/charge-date.module';
import { SearchBillingInfoModule } from './billing/search-billing-info/search-billing-info.module';
import { ClaimFieldMasterModule } from './master/claim-master/claim-field-master.module';

import {CreateBillModule} from './billing/create-bill/create-bill.module'
import  {EobModule} from './billing/eob/eob.module';
import {SubmitClaimModule} from './billing/submit-claim/submit-claim.module'
import {PaymentModule} from './billing/payment/payment.module'
import {AddPaymentModule} from './billing/add-payment/add-payment.module'

import { SpecialtyModule } from './master/specialty/specialty.module';
import {  RoleModule} from './master/role/role.module';
import {PartyLedgerModule} from './report/party-ledger/party-ledger.module';
import {PatientBalanceModule} from './report/patient-balance/patient-balance.module';
@NgModule({
  declarations: [
    AppComponent
    // ClaimFieldMasterComponent,
    // AddClaimFieldMasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingPageModule,
    PatientSearchModule,
    PatientProfileModule,
    AppointmentModule,
    PatientFlowSheetModule,
    LoginModule,
    PatientCreateModule,
    HttpClientModule,
    CoreModule,
    ButtonsModule,
    BrowserAnimationsModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    BookAppointmentModule,
    OfficeCalendarModule,
    DoctorCalendarModule,
    ServiceModule,
    AcceptcopayModule,
    PatientOthersModule,
    UserModule,
    ManageUserModule,
    ReasonModule,
    GeneralModule,
    ChargeModule,
    ChargeDateModule,
    PaymentModule,
    ClaimFieldMasterModule,
    SearchBillingInfoModule,
    CreateBillModule,
    EobModule,
    SubmitClaimModule,
    PaymentModule,
    AddPaymentModule,
    SpecialtyModule,
    RoleModule,
    PartyLedgerModule,
    PatientBalanceModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
