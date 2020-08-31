import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserBoardComponent } from './user-board/user-board.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.service';
import { UserSettingsComponent } from './user-settings/user-settings.component';


const routes: Routes = [
  { path: 'userboard', component: UserBoardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
