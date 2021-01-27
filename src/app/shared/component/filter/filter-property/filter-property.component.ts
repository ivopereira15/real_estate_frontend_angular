import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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

public purposeType: any;
public propertyType: any;
public priceFrom: any;
public priceTo: any;
public bedrooms: any;
public bathrooms: any;
public conditions: any;
public sizeTo: any;
public sizeFrom: any;
public yearBuiltFrom: any;
public yearBuiltTo: any;
public characteristics: any;

@Output() public purposeTypeChange = new EventEmitter();
@Output() public propertyTypeChange = new EventEmitter();
@Output() public priceFromChange = new EventEmitter();
@Output() public priceToChange = new EventEmitter();
@Output() public bedroomsChange = new EventEmitter();
@Output() public bathroomsChange = new EventEmitter();
@Output() public conditionsChange = new EventEmitter();
@Output() public sizeToChange = new EventEmitter();
@Output() public sizeFromChange = new EventEmitter();
@Output() public yearBuiltFromChange = new EventEmitter();
@Output() public yearBuiltToChange = new EventEmitter();
@Output() public characteristicsChange = new EventEmitter();

public technologies: string[] = ['Java', 'C#', '.NET'];

  constructor() { }

  ngOnInit() {
  }

}
