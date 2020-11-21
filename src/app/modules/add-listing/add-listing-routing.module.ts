import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddListingSellComponent } from './add-listing-sell/add-listing-sell.component';
import { AddListingRentComponent } from './add-listing-rent/add-listing-rent.component';
import { AddListingComponent } from './add-listing.component';

const routes: Routes = [
  {
    path: 'add-listing', component: AddListingComponent,
  },
  {
    path: 'add-listing/sell', component: AddListingSellComponent,
  },
  { path: 'add-listing/rent', component: AddListingRentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddListingRoutingModule { }
