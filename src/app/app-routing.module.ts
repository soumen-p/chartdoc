import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';


const appRoutes: Routes = [
  { path:'', component:LandingPageComponent },
  {
    path: 'manage-user',
    loadChildren: () => import('./user/manage-user/manage-user.module')
      .then(mod => mod.ManageUserModule)
  },
  {
    path: 'accept-copay',
    loadChildren: () => import('./accept-copay/accept-copay.module')
      .then(mod => mod.AcceptcopayModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module')
      .then(mod => mod.AppointmentModule)
  },
  {
    path: 'add-payment',
    loadChildren: () => import('./billing/add-payment/add-payment.module')
      .then(mod => mod.AddPaymentModule)
  },
  {
    path: 'create-bill',
    loadChildren: () => import('./billing/create-bill/create-bill.module')
      .then(mod => mod.CreateBillModule)
  },
  {
    path: 'eob',
    loadChildren: () => import('./billing/eob/eob.module')
      .then(mod => mod.EobModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./billing/payment/payment.module')
      .then(mod => mod.PaymentModule)
  },
  {
    path: 'create-charge',
    loadChildren: () => import('./billing/search-billing-info/search-billing-info.module')
      .then(mod => mod.SearchBillingInfoModule)
  },
  {
    path: 'create-claim',
    loadChildren: () => import('./billing/search-billing-info/search-billing-info.module')
      .then(mod => mod.SearchBillingInfoModule)
  },
  {
    path: 'manage-claim',
    loadChildren: () => import('./billing/search-billing-info/search-billing-info.module')
      .then(mod => mod.SearchBillingInfoModule)
  },
  {
    path: 'resubmit-claim',
    loadChildren: () => import('./billing/search-billing-info/search-billing-info.module')
      .then(mod => mod.SearchBillingInfoModule)
  },
  {
    path: 'create-eob',
    loadChildren: () => import('./billing/search-billing-info/search-billing-info.module')
      .then(mod => mod.SearchBillingInfoModule)
  },
  {
    path: 'book-appointment',
    loadChildren: () => import('./book-appointment/book-appointment.module')
      .then(mod => mod.BookAppointmentModule)
  },
  {
    path: 'doctor-calender',
    loadChildren: () => import('./doctor-calender/doctor-calendar.module')
      .then(mod => mod.DoctorCalendarModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'app-charge',
    loadChildren: () => import('./master/charge/charge.module')
      .then(mod => mod.ChargeModule)
  },
  {
    path: 'app-charge-date',
    loadChildren: () => import('./master/charge-date/charge-date.module')
      .then(mod => mod.ChargeDateModule)
  },
  {
    path: 'app-claim-field-master',
    loadChildren: () => import('./master/claim-master/claim-field-master.module')
      .then(mod => mod.ClaimFieldMasterModule)
  },
  {
    path: 'app-general',
    loadChildren: () => import('./master/general/general.module')
      .then(mod => mod.GeneralModule)
  },
  {
    path: 'app-reason',
    loadChildren: () => import('./master/reason/reason.module')
      .then(mod => mod.ReasonModule)
  },
  {
    path: 'app-role',
    loadChildren: () => import('./master/role/role.module')
      .then(mod => mod.RoleModule)
  },
  {
    path: 'app-service',
    loadChildren: () => import('./master/service/service.module')
      .then(mod => mod.ServiceModule)
  },
  {
    path: 'app-specialty',
    loadChildren: () => import('./master/specialty/specialty.module')
      .then(mod => mod.SpecialtyModule)
  },
  {
    path: 'office-calendar',
    loadChildren: () => import('./office-calendar/officecalendar.module')
      .then(mod => mod.OfficeCalendarModule)
  },
  {
    path: 'patient-create',
    loadChildren: () => import('./patient-create/patient-create.module')
      .then(mod => mod.PatientCreateModule)
  },
  {
    path: 'patient-flow-sheet',
    loadChildren: () => import('./patient-flow-sheet/patient-flow-sheet.module')
      .then(mod => mod.PatientFlowSheetModule)
  },
  {
    path: 'patient-others',
    loadChildren: () => import('./patient-others/patient-others.module')
      .then(mod => mod.PatientOthersModule)
  },
  {
    path: 'patient-profile',
    loadChildren: () => import('./patient-profile/patient-profile.module')
      .then(mod => mod.PatientProfileModule)
  },
  {
    path: 'patient-search',
    loadChildren: () => import('./patient-search/patient-search.module')
      .then(mod => mod.PatientSearchModule)
  },
  {
    path: 'party-ledger',
    loadChildren: () => import('./report/party-ledger/party-ledger.module')
      .then(mod => mod.PartyLedgerModule)
  },
  {
    path: 'patient-balance',
    loadChildren: () => import('./report/patient-balance/patient-balance.module')
      .then(mod => mod.PatientBalanceModule)
  },
  {
    path: 'new-user',
    loadChildren: () => import('./user/new-user/user.module')
      .then(mod => mod.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
