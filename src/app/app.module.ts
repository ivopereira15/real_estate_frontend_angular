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
import { HttpClientModule } from '@angular/common/http';
import { DeveloperPageModule } from './modules/developer-page/developer-page.module';

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
    SharedModule,
    HomeModule,
    PrivateModule,
    RegisterModule,
    LoginModule,
    BrowserAnimationsModule,
    DeveloperPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
