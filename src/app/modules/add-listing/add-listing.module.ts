import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddListingRoutingModule } from './add-listing-routing.module';
import { AddListingComponent } from './add-listing.component';
import { AddListingSellComponent } from './add-listing-sell/add-listing-sell.component';
import { AddListingRentComponent } from './add-listing-rent/add-listing-rent.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PublishSuccessComponent } from './publish-success/publish-success.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';


@NgModule({
  declarations: [AddListingComponent, AddListingSellComponent, AddListingRentComponent, PublishSuccessComponent, AuthenticateComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddListingRoutingModule,
    LeafletModule
  ]
})
export class AddListingModule { }
