import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './modules/register/register.module';
import { LoginModule } from './modules/login/login.module';
import { PrivateModule } from './modules/private/private.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PropertyPageModule } from './modules/property-page/property-page.module';
import { JwtInterceptor } from '../app/core/authentication/jwt-interceptor';
import { ErrorInterceptor } from '../app/core/authentication/http-interceptor';
import { AddListingModule } from './modules/add-listing/add-listing.module';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserState } from 'src/app/core/ngxs-state-management/user.state'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    CoreModule,
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'user'
    }),
    NgxsResetPluginModule.forRoot(),
    SharedModule,
    HomeModule,
    PrivateModule,
    RegisterModule,
    LoginModule,
    BrowserAnimationsModule,
    PropertyPageModule,
    AddListingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
