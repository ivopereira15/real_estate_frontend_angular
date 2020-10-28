import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterPrivateUserComponent } from './register-private-user/register-private-user.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [RegisterComponent, RegisterPrivateUserComponent, RegisterCompanyComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class RegisterModule { }
