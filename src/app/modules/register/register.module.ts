import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterDeveloperComponent } from './register-developer/register-developer.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [RegisterComponent, RegisterDeveloperComponent, RegisterCompanyComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class RegisterModule { }
