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

const components = [
  NavbarComponent,
  FilterPropertyComponent,
  FilterContainerComponent,
  PropertyFrameComponent
];

@NgModule({
  declarations: [components, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [components, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule { }
