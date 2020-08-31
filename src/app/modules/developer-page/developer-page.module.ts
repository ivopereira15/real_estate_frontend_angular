import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperPageRoutingModule } from './developer-page-routing.module';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DeveloperDetailComponent],
  imports: [
    CommonModule,
    DeveloperPageRoutingModule,
    SharedModule
  ]
})
export class DeveloperPageModule { }
