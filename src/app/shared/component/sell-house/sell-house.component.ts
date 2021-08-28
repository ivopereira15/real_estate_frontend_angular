import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/services/shared/custom_validations';
import { Characteristics } from '../../models/listing/characteristics';

import { OperationType } from '../../models/listing/operation-type';
import { PropertyType } from '../../models/listing/property-type';
import { SellHouse } from '../../models/listing/sell-house';
import { MapPoint } from '../../models/map/map-point';

@Component({
  selector: 'app-sell-house',
  templateUrl: './sell-house.component.html',
  styleUrls: ['./sell-house.component.scss']
})
export class SellHouseComponent implements OnInit, OnChanges {

  @Input() public sellHouseForm: SellHouse;
  @Input() public operationTypes: OperationType[];
  @Input() public propertyTypes: PropertyType[];
  @Input() public title: string;
  @Output() public publishListing: EventEmitter<any> = new EventEmitter<any>();

  public mapPoint: MapPoint;
  submitProperty: boolean = false;
  typology: string[] = ['T0', 'T1', 'T2', 'T3'];
  conditionStateOption: string[] = ['Contrution in Progress', 'Old', 'New', 'Renew'];
  sunOrientationOption: string[] = ['N', 'S', 'E', 'W'];
  bathrooms: number[] = [1, 2, 3, 4, 5];
  floors: number[] = [1, 2, 3, 4, 5];
  rooms: number[] = [1, 2, 3, 4, 5];
  energyCertificate: string[] = ['A', 'B', 'C', 'D'];
  countries: string[] = ['Italy', 'Ukraine', 'Portugal'];
  thumbnails = [];
  photos = [];
  characteristics: Characteristics[] = [{
    Id: 1,
    Name: 'Balcony',
    IconName: 'Balcony',
    addedToProperty: false
  },
  {
    Id: 2,
    Name: 'A/C',
    IconName: 'AC',
    addedToProperty: false
  },
  {
    Id: 3,
    Name: 'Furniture',
    IconName: 'furniture',
    addedToProperty: false
  },
  {
    Id: 4,
    Name: 'Fireplate',
    IconName: 'fireplate',
    addedToProperty: false
  },
  {
    Id: 5,
    Name: 'Hardwood',
    IconName: 'board',
    addedToProperty: false
  },
  {
    Id: 6,
    Name: 'Wheelchart access',
    IconName: 'Wheelchart access',
    addedToProperty: false
  },
  {
    Id: 7,
    Name: 'Garage',
    IconName: 'garage',
    addedToProperty: false
  },
  {
    Id: 8,
    Name: 'Elevator',
    IconName: 'elevator',
    addedToProperty: false
  },
  {
    Id: 9,
    Name: 'Pool,',
    IconName: 'pool',
    addedToProperty: false
  },
  {
    Id: 10,
    Name: 'Shopping',
    IconName: 'shopping',
    addedToProperty: false
  },
  {
    Id: 11,
    Name: 'Security',
    IconName: 'security',
    addedToProperty: false
  },
  {
    Id: 12,
    Name: 'Green Spaces',
    IconName: 'green-park-city-space',
    addedToProperty: false
  },
  {
    Id: 13,
    Name: 'School',
    IconName: 'university',
    addedToProperty: false
  },
  {
    Id: 14,
    Name: 'Gym',
    IconName: 'gym',
    addedToProperty: false
  },
  {
    Id: 15,
    Name: 'Barbecue',
    IconName: 'barbecue',
    addedToProperty: false
  },
  {
    Id: 16,
    Name: 'Kitchnet',
    IconName: 'kitchen',
    addedToProperty: false
  },
  {
    Id: 17,
    Name: 'HotTube',
    IconName: 'hot-tub',
    addedToProperty: false
  },  
  {
    Id: 18,
    Name: 'Pantry',
    IconName: 'pantry',
    addedToProperty: false
  },
  {
    Id: 19,
    Name: 'Terrace',
    IconName: 'terrace',
    addedToProperty: false
  },
  {
    Id: 20,
    Name: 'Electrical Blinds',
    IconName: 'blind',
    addedToProperty: false
  },
  {
    Id: 21,
    Name: 'Alarm',
    IconName: 'alert',
    addedToProperty: false
  },
  {
    Id: 22,
    Name: 'Ocean View',
    IconName: 'wave',
    addedToProperty: false
  },
  {
    Id: 23,
    Name: 'Pets Allowed',
    IconName: 'pets',
    addedToProperty: false
  }
];

  Id: number;
  Name: string;
  CountNumber: number;
  IconName: string;
  Deleted: boolean;
  
  choices = [
    'Bulbasaur',
    'Charmander',
    'Squirtle'
  ];
  public mainPropertyCharacteristic: FormGroup;

  constructor(  public form: FormBuilder) {
    this.mainPropertyCharacteristic = this.form.group({
      price: ['', [Validators.required, CustomValidators.validateIfIsNumber]],
      netAream2: ['', [Validators.required, CustomValidators.validateIfIsNumber]],
      priceNetAream2: [],
      grossAream2: ['', [Validators.required, CustomValidators.validateIfIsNumber]],
      propertyTypeId: [null, Validators.required],
      floor: [],
      rooms: [],
      yearOfConstruction:  ['', [Validators.required, CustomValidators.validateIfIsNumber, CustomValidators.validateYear]],
      numberOfBathrooms: [null, Validators.required],
      enerergyCertificate: [],
      conditionState: [null, Validators.required],
      sunOrientation: [],
      city: [null, Validators.required],
      street: [null, Validators.required],
      country: [null, Validators.required],
      name: [null, Validators.required],
      email: [null,  [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, CustomValidators.validatePhone]],
      description: [null, Validators.required],
    });
}

  ngOnInit(): void {

  }

  ngOnChanges(){
    this.mapPoint = new MapPoint();
    this.mapPoint.latitude = this.sellHouseForm.Latitude;
    this.mapPoint.longitude = this.sellHouseForm.Longitude;

    console.log(11);
  }

  public uploadImage(image: any): void {
    let uploadedImage: File = image.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(uploadedImage);
    reader.onload = (_event) => {
      let result = reader.result;

      this.photos.push(uploadedImage);

      this.thumbnails.push(result);
    };
  }

  setCoordinates(e: any) {

    this.sellHouseForm.Latitude = e.latitude;
    this.sellHouseForm.Longitude = e.longitude;
  }

  get c() {
    return this.mainPropertyCharacteristic as FormGroup;
  }

  publishListingSubmit() {
    this.submitProperty = true;
    
    if (this.mainPropertyCharacteristic.valid && this.photos.length > 0) {
      this.sellHouseForm.Price =   this.mainPropertyCharacteristic.controls.price.value;
      this.sellHouseForm.NetAream2 =   this.mainPropertyCharacteristic.controls.netAream2.value;
      this.sellHouseForm.PriceNetAream2 =   this.mainPropertyCharacteristic.controls.price.value;
      this.sellHouseForm.GrossAream2 =   this.mainPropertyCharacteristic.controls.grossAream2.value;
      this.sellHouseForm.PropertyTypeId =   this.mainPropertyCharacteristic.controls.propertyTypeId.value;
      this.sellHouseForm.Floor =   this.mainPropertyCharacteristic.controls.floor.value;
      this.sellHouseForm.GrossAream2 =   this.mainPropertyCharacteristic.controls.grossAream2.value;
      this.sellHouseForm.Rooms =   this.mainPropertyCharacteristic.controls.rooms.value;
      this.sellHouseForm.NumberOfBathrooms =   this.mainPropertyCharacteristic.controls.numberOfBathrooms.value;
      this.sellHouseForm.EnerergyCertificate =   this.mainPropertyCharacteristic.controls.enerergyCertificate.value;
      this.sellHouseForm.City =  this.mainPropertyCharacteristic.controls.city.value;
      this.sellHouseForm.Country =  this.mainPropertyCharacteristic.controls.country.value;
      this.sellHouseForm.photos = this.photos;
      this.sellHouseForm.Address =  this.mainPropertyCharacteristic.controls.street.value;
      console.log(this.sellHouseForm);
      this.publishListing.emit(this.sellHouseForm);
    }
  }

  public addToProperty(item: Characteristics): void {
    let itemFound: Characteristics;
    itemFound = this.characteristics.find((i)=> i.Id === item.Id);
    itemFound.addedToProperty = !itemFound.addedToProperty;
  }
  
}
