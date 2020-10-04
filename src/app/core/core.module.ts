import { NgModule, ɵSWITCH_ELEMENT_REF_FACTORY__POST_R3__, Injectable, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { httpInterceptorProviders } from './http-interceptor';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DndDirective } from './file-upload/dnd.directive';
import { ProgressComponent } from './file-upload/progress/progress.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpIntercept } from './http-interceptor/http-intercept';
import { CommonSearchComponent } from './common-search/common-search.component';
import { FormsModule } from '@angular/forms';
import { CommonSearchFilterPipe } from '../services/common-search-filter.pipe';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from '../services/loader.service';
import { LoaderInterceptorService } from './http-interceptor/loader-interceptor.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';

// Initialize Sentry with dsn Key
// Sentry.init({
//   dsn: 'https://58bb570def11409595c4c561b9626e30@o383729.ingest.sentry.io/5214082'
// });

// setup custom config to capture details about user
// Sentry.configureScope((scope) => {
//   scope.setUser({ 'email' : 'sudip.roy1@gmail.com' });
// })

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler{
//   constructor(){}

//   handleError(error){
//     Sentry.captureException(error.originalError || error);
//     throw error;
//   }
// }

@NgModule({
  declarations: [ FileUploadComponent, 
                  DndDirective, 
                  ProgressComponent, 
                  CommonSearchComponent,
                  CommonSearchFilterPipe,
                  LoaderComponent,
                  JwPaginationComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    CommonService,
    SharedService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true },
    // { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
              FileUploadComponent, 
              DndDirective, 
              ProgressComponent, 
              CommonSearchComponent,
              CommonSearchFilterPipe, 
              LoaderComponent,
              JwPaginationComponent
          ]
})
export class CoreModule { }
