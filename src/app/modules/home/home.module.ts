import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainBoardComponent } from './main-board/main-board.component';
import { SearchBoardComponent } from './search-board/search-board.component';


@NgModule({
  declarations: [HomeComponent, MainBoardComponent, SearchBoardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
