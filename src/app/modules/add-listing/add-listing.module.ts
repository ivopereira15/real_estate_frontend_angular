import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddListingRoutingModule } from './add-listing-routing.module';
import { AddListingComponent } from './add-listing.component';
import { AddListingSellComponent } from './add-listing-sell/add-listing-sell.component';
import { AddListingRentComponent } from './add-listing-rent/add-listing-rent.component';
import { SharedModule } from '../../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PublishSuccessComponent } from './publish-success/publish-success.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RedirectComponent } from './redirect/redirect.component';
import { CardComponent } from './card/card.component';
import { AddListingRentRoomComponent } from './add-listing-rent-room/add-listing-rent-room.component';



@NgModule({
  declarations: [AddListingComponent, AddListingSellComponent, 
    AddListingRentComponent, PublishSuccessComponent, AuthenticateComponent, 
    RedirectComponent, CardComponent, AddListingRentRoomComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddListingRoutingModule,
    LeafletModule
  ],
  exports: [CardComponent],
})
export class AddListingModule { }
