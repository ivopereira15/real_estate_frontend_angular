import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FilterDevsComponent } from './component/filter/filter-devs/filter-devs.component';
import { FilterJobsComponent } from './component/filter/filter-jobs/filter-jobs.component';
import { FilterContainerComponent } from './component/filter/filter-container/filter-container.component';
import { RouterModule } from '@angular/router';
import { DevsFrameComponent } from './component/devs-frame/devs-frame.component';
import { JobsFrameComponent } from './component/jobs-frame/jobs-frame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './component/footer/footer.component';

const components = [
  NavbarComponent,
  FilterDevsComponent,
  FilterJobsComponent,
  FilterContainerComponent,
  DevsFrameComponent,
  JobsFrameComponent
];

@NgModule({
  declarations: [components, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [components, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule { }
