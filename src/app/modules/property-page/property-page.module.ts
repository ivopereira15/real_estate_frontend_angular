import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyPageRoutingModule } from './property-page-routing.module';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view'; // ng-image-fullscreen-view


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
