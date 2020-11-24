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
    path: 'appointment-search',
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
    path: 'submit-claim',
    loadChildren: () => import('./billing/submit-claim/submit-claim.module')
      .then(mod => mod.SubmitClaimModule)
  },
  {
    path: 'create-eob',
    loadChildren: () => import('./billing/search-billing-info/search-billing-info.module')
      .then(mod => mod.SearchBillingInfoModule)
  },
  {
    path: 'eob-edit',
    loadChildren: () => import('./billing/eob/eob.module')
      .then(mod => mod.EobModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module')
      .then(mod => mod.AppointmentModule)
  },
  {
    path: 'book-appointment',
    loadChildren: () => import('./book-appointment/book-appointment.module')
      .then(mod => mod.BookAppointmentModule)
  },
  {
    path: 'flowsheet-book-appointment',
    loadChildren: () => import('./book-appointment/book-appointment.module')
      .then(mod => mod.BookAppointmentModule)
  },
  {
    path: 'doctor-calendar',
    loadChildren: () => import('./doctor-calender/doctor-calendar.module')
      .then(mod => mod.DoctorCalendarModule)
  },
  {
    path: 'viewpatient-history',
    loadChildren: () => import('./doctor-calender/doctor-calendar.module')
      .then(mod => mod.DoctorCalendarModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module')
      .then(mod => mod.ForgetPasswordModule)
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
    path: 'app-add-charge-date',
    loadChildren: () => import('./master/charge-date/add-charge-date/app-add-charge-date.module')
      .then(mod => mod.NewhargeDateModule)
  },
  {
    path: 'app-claim-field-master',
    loadChildren: () => import('./master/claim-master/claim-field-master.module')
      .then(mod => mod.ClaimFieldMasterModule)
  },
  {
    path: 'app-add-claim-field-master',
    loadChildren: () => import('./master/claim-master/add-claim-field-master/add-claim-field-master.module')
      .then(mod => mod.NewClaimFieldMasterModule)
  },
  {
    path: 'app-general',
    loadChildren: () => import('./master/general/general.module')
      .then(mod => mod.GeneralModule)
  },
  {
    path: 'app-add-general',
    loadChildren: () => import('./master/general/add-general/add-general.component.module')
      .then(mod => mod.NewGeneralModule)
  },
  
  {
    path: 'app-reason',
    loadChildren: () => import('./master/reason/reason.module')
      .then(mod => mod.ReasonModule)
  },
  {
    path: 'new-reason',
    loadChildren: () => import('./master/reason/create-new-reason/create-new-reason.module')
      .then(mod => mod.NewReasonModule)
  },
  {
    path: 'app-role',
    loadChildren: () => import('./master/role/role.module')
      .then(mod => mod.RoleModule)
  },
  {
    path: 'new-role',
    loadChildren: () => import('./master/role/create-new-role/create-new-role.module')
      .then(mod => mod.NewRoleModule)
  },
  {
    path: 'app-service',
    loadChildren: () => import('./master/service/service.module')
      .then(mod => mod.ServiceModule)
  },
  {
    path: 'new-service',
    loadChildren: () => import('./master/service/create-new-service/create-new-service.module')
      .then(mod => mod.NewServiceModule)
  },
  {
    path: 'app-specialty',
    loadChildren: () => import('./master/specialty/specialty.module')
      .then(mod => mod.SpecialtyModule)
  },
  {
    path: 'new-specialty',
    loadChildren: () => import('./master/specialty/create-new-specialty/create-new-specialty.module')
      .then(mod => mod.NewSpecialtyModule)
  },
  {
    path: 'calendar-schedule',
    loadChildren: () => import('./office-calendar/calendarschedule.module')
      .then(mod => mod.CalendarscheduleModule)
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
    path: 'patient-search-appointment',
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
  },
  {
    path: 'user',
    loadChildren: () => import('./user/new-user/user.module')
      .then(mod => mod.UserModule)
  },
  { path: '**', redirectTo: '' }
  //{ path:'**', redirectTo: '/', pathMatch: 'full' }
  // { path:'/landing-page', component:LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
