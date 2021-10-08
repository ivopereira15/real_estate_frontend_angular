import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyPageRoutingModule } from './property-page-routing.module';
import { PropertyDetailComponent } from './property-detail/property-detail.component';


import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view'; // ng-image-fullscreen-view
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [PropertyDetailComponent],
  imports: [
    CommonModule,
    PropertyPageRoutingModule,
    SharedModule,
    NgImageFullscreenViewModule
  ]
})
export class PropertyPageModule { }
