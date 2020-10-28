import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-property',
  templateUrl: './filter-property.component.html',
  styleUrls: ['./filter-property.component.scss']
})
export class FilterPropertyComponent implements OnInit {

public propertyTypes: string[] = ['Apartments', 'Houses'];
public purposeTypes: string[] = ['Buy', 'Sell', 'Rent'];
public bedroomsQuantity: string[] = ['T0', 'T1', 'T2', 'T3', 'T4'];
public bathroomsQuantity: string[] = ['1', '2', '3', '4', '5'];
public conditionTypes: string[] = ['Old', 'New', 'Needs Reconstruction', 'Under Construction'];


public technologies: string[] = ['Java', 'C#', '.NET'];

  constructor() { }

  ngOnInit() {
  }

}
