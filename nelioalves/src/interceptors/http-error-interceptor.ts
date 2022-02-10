import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface IError {
  error: any;
  statusCode: number;
  message: string;
}

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('### HOUVE UM ERROR AQUI ###');

        let objectError: IError;
        if (error.hasOwnProperty('error') && error.error === null) {
          objectError = {
            error: error.error,
            statusCode: error.status,
            message: error.message,
          };
        }

        if (error.hasOwnProperty('error') && error.error !== null) {
          objectError = {
            error: JSON.parse(error.error),
            statusCode: error.status,
            message: error.message,
          };
        }

        console.log(objectError);
        return throwError(objectError);
      })
    ) as any;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
