import { API_CONFIG } from 'src/config/api.config';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const localUser = this.storageService.getLocalUser();
    const baseUrlCharQuantity = API_CONFIG.baseUrl.length;
    const requestToApi =
      req.url.substring(0, baseUrlCharQuantity) === API_CONFIG.baseUrl;

    if (localUser && requestToApi) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${localUser.token}`),
      });
      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HttpAuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpAuthInterceptor,
  multi: true,
};
