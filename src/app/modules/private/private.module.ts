import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { UserBoardComponent } from './user-board/user-board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [UserBoardComponent, MyListingsComponent, EditListingComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
