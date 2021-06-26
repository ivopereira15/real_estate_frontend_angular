import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatToolbarModule,
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatRadioModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';

const MaterialComponents = [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule];


@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
