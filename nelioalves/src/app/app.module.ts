import { StorageService } from './../services/storage.service';
import { CategoriesService } from './../services/domain/categories.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpErrorInterceptorProvider } from 'src/interceptors/http-error-interceptor';
import { AuthService } from 'src/services/auth.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CategoriesService,
    AuthService,
    HttpErrorInterceptorProvider,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
