import { FieldMessage } from './../models/fieldmessage';
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
import { AlertController } from '@ionic/angular';

interface IError {
  error: any;
  statusCode: number;
  message: string;
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private storageServe: StorageService,
    private alertController: AlertController
  ) {}

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
            error: error.error,
            statusCode: error.status,
            message: error.message,
          };
        }

        switch (objectError.statusCode) {
          case 401:
            this.handle401(objectError);
            break;

          case 403:
            this.handle403();
            break;

          case 422:
            this.handle422(objectError);
            break;

          default:
            this.handleDefaultError(objectError);
        }

        //console.log(objectError);
        return throwError(objectError);
      })
    ) as any;
  }

  async handle401(error: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: error.statusCode,
      subHeader: JSON.parse(error.error).message,
      message: '',
      buttons: ['OK'],
    });
    await alert.present();
  }
  handle403() {
    this.storageServe.setLocalUser(null);
  }

  async handle422(error: any) {
    // console.log(JSON.parse(error.error).errors);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error: ' + error.statusCode,
      subHeader: 'Validation Error',
      message: this.listErrors(JSON.parse(error.error).errors),
      buttons: ['OK'],
    });
    await alert.present();
  }

  async handleDefaultError(objectError: IError) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: String(objectError.statusCode),
      subHeader: objectError.error.error,
      message: objectError.message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  private listErrors(errors: FieldMessage[]): string {
    let errorHtml: string = '';
    for (var i = 0; i < errors.length; i++) {
      errorHtml =
        errorHtml +
        `<p><strong>${errors[i].fieldName}</strong> : ${errors[i].message}</p>`;
    }
    return errorHtml;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
