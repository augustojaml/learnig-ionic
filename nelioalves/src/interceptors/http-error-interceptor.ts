import { StorageService } from 'src/services/storage.service';
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
import { Injectable } from '@angular/core';

interface IError {
  error: any;
  statusCode: number;
  message: string;
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private storageServe: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
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

        switch (objectError.statusCode) {
          case 403:
            this.handle403();
            break;
        }

        console.log(objectError);
        return throwError(objectError);
      })
    ) as any;
  }

  handle403() {
    this.storageServe.setLocalUser(null);
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
