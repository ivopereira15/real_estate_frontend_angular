import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddListingSellComponent } from './add-listing-sell/add-listing-sell.component';
import { AddListingRentComponent } from './add-listing-rent/add-listing-rent.component';
import { AddListingComponent } from './add-listing.component';

import { PublishSuccessComponent } from './publish-success/publish-success.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RedirectComponent } from './redirect/redirect.component';
import { AddListingRentRoomComponent } from './add-listing-rent-room/add-listing-rent-room.component';
import { AuthGuard } from '../../core/guards/auth-guard.service';

const routes: Routes = [
  { path: 'add-listing', component: AddListingComponent, },
  { path: 'add-listing/sell', component: AddListingSellComponent },
  { path: 'add-listing/rent-house', component: AddListingRentComponent },
  { path: 'add-listing/rent-room', component: AddListingRentRoomComponent },
  { path: 'publish-success', component: PublishSuccessComponent, canActivate: [AuthGuard] },
  { path: 'authenitcate', component:AuthenticateComponent },
  { path: 'redirect', component: RedirectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddListingRoutingModule { }
