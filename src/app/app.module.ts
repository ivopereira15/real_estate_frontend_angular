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
import { UserState } from 'src/app/core/ngxs-state-management/user.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducer } from './core/ngxs-state-management/search/reducer';
import { adaptReducer } from '@state-adapt/core/lib/adapt.reducer';
import { actionSanitizer, stateSanitizer } from '@state-adapt/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    StoreModule.forRoot({ ngrx: reducer, adapt: adaptReducer }),
    StoreDevtoolsModule.instrument({
      actionSanitizer,
      stateSanitizer
    }),
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
    AddListingModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
