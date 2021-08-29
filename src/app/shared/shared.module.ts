import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FilterPropertyComponent } from './component/filter/filter-property/filter-property.component';
import { FilterContainerComponent } from './component/filter/filter-container/filter-container.component';
import { RouterModule } from '@angular/router';
import { PropertyFrameComponent } from './component/property-frame/property-frame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';
import { SellHouseComponent } from './component/sell-house/sell-house.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './component/map-container/map/map.component';
import { GeocodingComponent } from './component/map-container/geocoding/geocoding.component';
import { FilterSearchComponent } from './component/filter/filter-search/filter-search.component';
import { MapSearchComponent } from './component/map-container/map-search/map-search.component';
import { MatButtonLoadingDirective } from './directives/button-loading.directive';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { ListOfCardsComponent } from './component/list-of-cards/list-of-cards.component'; // ng-image-fullscreen-view

const components = [
  NavbarComponent,
  FilterPropertyComponent,
  FilterContainerComponent,
  PropertyFrameComponent,
  SellHouseComponent,
  MapComponent,
  MapSearchComponent,
  MatButtonLoadingDirective,
  ListOfCardsComponent
];

@NgModule({
  declarations: [components, FooterComponent, GeocodingComponent, FilterSearchComponent, PropertyDetailsComponent, CreateDialogComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule, LeafletModule, NgImageFullscreenViewModule],
  exports: [components, MaterialModule, FormsModule, ReactiveFormsModule],
  entryComponents: [PropertyDetailsComponent, CreateDialogComponent]
})
export class SharedModule { }
