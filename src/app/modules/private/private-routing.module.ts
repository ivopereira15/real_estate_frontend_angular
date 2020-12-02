import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserBoardComponent } from './user-board/user-board.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.service';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';


const routes: Routes = [
  { path: 'userboard', component: UserBoardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] },
  { path: 'my-listings', component: MyListingsComponent, canActivate: [AuthGuard] },
  { path: 'my-listings/edit/:propertyId', component: EditListingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
