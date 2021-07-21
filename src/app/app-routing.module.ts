import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login/login.component';
import { RegisterComponent } from './modules/register/register/register.component';
import { RegisterPrivateUserComponent } from './modules/register/register-private-user/register-private-user.component';
import { RegisterCompanyComponent } from './modules/register/register-company/register-company.component';
import { PropertyDetailsComponent } from './shared/property-details/property-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainBoardComponent } from './modules/home/main-board/main-board.component';
import { CreateDialogComponent } from './shared/create-dialog/create-dialog.component';


const routes: Routes = [
  { path: '', component: MainBoardComponent},
  {
    path: 'details/:id', component: CreateDialogComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/private-user', component: RegisterPrivateUserComponent },
  { path: 'register/company', component: RegisterCompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
