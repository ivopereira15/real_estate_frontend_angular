import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login/login.component';
import { RegisterComponent } from './modules/register/register/register.component';
import { RegisterDeveloperComponent } from './modules/register/register-developer/register-developer.component';
import { RegisterCompanyComponent } from './modules/register/register-company/register-company.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/developer', component: RegisterDeveloperComponent },
  { path: 'register/company', component: RegisterCompanyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
