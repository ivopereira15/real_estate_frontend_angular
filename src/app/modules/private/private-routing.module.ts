import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserBoardComponent } from './user-board/user-board.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.service';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MessagesComponent } from './messages/messages.component';


const routes: Routes = [
  { path: 'userboard', component: UserBoardComponent, canActivate: [AuthGuard] },
  { path: 'my-listings', component: MyListingsComponent, canActivate: [AuthGuard] },
  { path: 'my-listings/edit/:propertyId', component: EditListingComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component:AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
