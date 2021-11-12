import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { UserBoardComponent } from './user-board/user-board.component';
import { SharedModule } from '../../shared/shared.module';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatComponent } from './messages/chat/chat.component';
import { MessageComponent } from './messages/message/message.component';
import { CardComponent } from './my-listings/card/card.component';


@NgModule({
  declarations: [UserBoardComponent, 
    MyListingsComponent, EditListingComponent,
     AdminDashboardComponent, MessagesComponent, 
     ChatComponent, MessageComponent, CardComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
