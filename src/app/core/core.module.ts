import { NgModule, ɵSWITCH_ELEMENT_REF_FACTORY__POST_R3__, Injectable, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { httpInterceptorProviders } from './http-interceptor';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DndDirective } from './file-upload/dnd.directive';
import { ProgressComponent } from './file-upload/progress/progress.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpIntercept } from './http-interceptor/http-intercept';
import * as Sentry from '@sentry/browser';
import { CommonSearchComponent } from './common-search/common-search.component';
import { FormsModule } from '@angular/forms';
import { CommonSearchFilterPipe } from '../services/common-search-filter.pipe';
// Initialize Sentry with dsn Key
Sentry.init({
  dsn: 'https://58bb570def11409595c4c561b9626e30@o383729.ingest.sentry.io/5214082'
});

// setup custom config to capture details about user
Sentry.configureScope((scope) => {
  scope.setUser({ 'email' : 'sudip.roy1@gmail.com' });
})

@Injectable()
export class SentryErrorHandler implements ErrorHandler{
  constructor(){}

  handleError(error){
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [ FileUploadComponent, 
                  DndDirective, 
                  ProgressComponent, 
                  CommonSearchComponent,
                  CommonSearchFilterPipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    CommonService,
    SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  exports: [FileUploadComponent, DndDirective, ProgressComponent, CommonSearchComponent,CommonSearchFilterPipe]
})
export class CoreModule { }
