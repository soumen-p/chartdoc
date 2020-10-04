import { HttpHandler, HttpRequest, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class HttpIntercept implements HttpInterceptor{
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error instanceof HttpErrorResponse){
                    // Sentry.captureException(error);
                    return throwError(error)
                } else{
                    // Sentry.captureException(error);
                    return throwError(error);
                }
            })
        );
    }
}