import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DevsBoardComponent } from './devs-board/devs-board.component';
import { JobsBoardComponent } from './jobs-board/jobs-board.component';


@NgModule({
  declarations: [HomeComponent, DevsBoardComponent, JobsBoardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
