import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainBoardComponent } from './main-board/main-board.component';
import { SearchBoardComponent } from './search-board/search-board.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material';


@NgModule({
  declarations: [HomeComponent, MainBoardComponent, SearchBoardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    LeafletModule,
    NgImageFullscreenViewModule, NgImageSliderModule, NgbModule,
    MatTabsModule
  ]
})
export class HomeModule { }
