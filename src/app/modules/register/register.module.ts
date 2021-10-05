import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { RegisterPrivateUserComponent } from './register-private-user/register-private-user.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [RegisterComponent, RegisterPrivateUserComponent, RegisterCompanyComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class RegisterModule { }
