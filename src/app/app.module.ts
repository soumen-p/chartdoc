//import { BrowserModule } from '@angular/platform-browser';
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

import { DirectivesModule } from './directives/directives.module';

import { ToastrModule } from 'ng6-toastr-notifications';

import { ShellModule } from './shell/shell.module';
@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    AppRoutingModule,
    
    LandingPageModule,
    
    HttpClientModule,
    CoreModule,
    ButtonsModule,
    BrowserAnimationsModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    
    ShellModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
