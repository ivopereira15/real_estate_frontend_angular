import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, ChangeDetectorRef, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, Maps } from '../../../core/services/api/location.service';
import { CustomValidators } from '../../../core/services/shared/custom_validations';
import { characteristics } from '../../models/characteristicsList';

import { Characteristics } from '../../models/listing/characteristics';

import { OperationType } from '../../models/listing/operation-type';
import { PropertyType } from '../../models/listing/property-type';
import { SellHouse } from '../../models/listing/sell-house';
import { MapPoint } from '../../models/map/map-point';
const place = null as google.maps.places.PlaceResult;
type Components = typeof place.address_components;
@Component({
  selector: 'app-sell-house',
  templateUrl: './sell-house.component.html',
  styleUrls: ['./sell-house.component.scss']
})


export class SellHouseComponent implements OnInit, OnChanges {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @Input() public sellHouseForm: SellHouse;
  @Input() public operationTypes: OperationType[];
  @Input() public propertyTypes: PropertyType[];
  @Input() public title: string;
  @Output() public publishListing: EventEmitter<any> = new EventEmitter<any>();
   public setMapCoordinates: any;


  public mapPoint: MapPoint;

  submitProperty: boolean = false;
  typology: string[] = ['T0', 'T1', 'T2', 'T3', 'T4', 'T5'];
  conditionStateOption: string[] = ['Contrution in Progress', 'Old', 'New', 'Renew'];
  sunOrientationOption: string[] = ['N', 'S', 'E', 'W'];
  bathrooms: number[] = [1, 2, 3, 4, 5];
  floors: number[] = [1, 2, 3, 4, 5];
  rooms: number[] = [1, 2, 3, 4, 5];
  energyCertificate: string[] = ['A', 'B', 'C', 'D'];
  countries: string[] = ['Italy', 'Ukraine', 'Portugal'];
  thumbnails = [];
  photos = [];
  characteristics: Characteristics[] = characteristics;

  Id: number;
  Name: string;
  CountNumber: number;
  IconName: string;
  Deleted: boolean;

  public mainPropertyCharacteristic: FormGroup;

  constructor(
    public form: FormBuilder,
    apiService: ApiService,
    private ngZone: NgZone,
    ) {
    this.mainPropertyCharacteristic = this.form.group({
      price: ['', [Validators.required, CustomValidators.validateIfIsNumber]],
      netAream2: ['', [Validators.required, CustomValidators.validateIfIsNumber]],
      priceNetAream2: [],
      grossAream2: ['', [Validators.required, CustomValidators.validateIfIsNumber]],
      propertyTypeId: [null, Validators.required],
      floor: [],
      rooms: [],
      yearOfConstruction: ['', [Validators.required, CustomValidators.validateIfIsNumber, CustomValidators.validateYear]],
      numberOfBathrooms: [null, Validators.required],
      enerergyCertificate: [],
      conditionState: [null, Validators.required],
      sunOrientation: [],
      city: [null, Validators.required],
      street: [null, Validators.required],
      country: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, CustomValidators.validatePhone]],
      description: [null, Validators.required],
    });

    apiService.api.then(maps => {
      this.initAutocomplete(maps);

    });
  }
  ngOnInit(): void {

  }

  initAutocomplete(maps: Maps) {
    if (maps){
      const autocomplete = new maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.onPlaceChange(autocomplete.getPlace());
        });
      });
    }
  }

  onPlaceChange(place: google.maps.places.PlaceResult) {
    const location = this.locationFromPlace(place);
    console.log(location);
    if (location.coordinates){
      this.setCoordinates(location.coordinates);
      this.setMapCoordinates = location.coordinates;
    }

  }

  public locationFromPlace(place: google.maps.places.PlaceResult) {
    const components = place.address_components;
    if (components === undefined) {
      return null;
    }

    const areaLevel3 = getShort(components, 'administrative_area_level_3');
    const locality = getLong(components, 'locality');

    const cityName = locality || areaLevel3;
    const countryName = getLong(components, 'country');
    const countryCode = getShort(components, 'country');
    const stateCode = getShort(components, 'administrative_area_level_1');
    const name = place.name !== cityName ? place.name : null;

    const coordinates = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    const bounds = place.geometry.viewport.toJSON();

    // placeId is in place.place_id, if needed
    return { name, cityName, countryName, countryCode, stateCode, bounds, coordinates };
  }





  ngOnChanges() {
    this.mapPoint = new MapPoint();
    this.mapPoint.latitude = this.sellHouseForm.Latitude;
    this.mapPoint.longitude = this.sellHouseForm.Longitude;

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
      const characteristicsToAdd: Characteristics[] = [];
      this.characteristics.map((characteristics) => {
        if (characteristics.addedToProperty) {
          characteristicsToAdd.push(characteristics)
        }
      });
      this.sellHouseForm.Price = this.mainPropertyCharacteristic.controls.price.value;
      this.sellHouseForm.NetAream2 = this.mainPropertyCharacteristic.controls.netAream2.value;
      this.sellHouseForm.PriceNetAream2 = this.mainPropertyCharacteristic.controls.price.value;
      this.sellHouseForm.GrossAream2 = this.mainPropertyCharacteristic.controls.grossAream2.value;
      this.sellHouseForm.PropertyTypeId = this.mainPropertyCharacteristic.controls.propertyTypeId.value;
      this.sellHouseForm.Floor = this.mainPropertyCharacteristic.controls.floor.value;
      this.sellHouseForm.YearOfConstruction = this.mainPropertyCharacteristic.controls.yearOfConstruction.value;
      this.sellHouseForm.Rooms = this.mainPropertyCharacteristic.controls.rooms.value;
      this.sellHouseForm.NumberOfBathrooms = this.mainPropertyCharacteristic.controls.numberOfBathrooms.value;
      this.sellHouseForm.EnerergyCertificate = this.mainPropertyCharacteristic.controls.enerergyCertificate.value;
      this.sellHouseForm.City = this.mainPropertyCharacteristic.controls.city.value;
      this.sellHouseForm.Country = this.mainPropertyCharacteristic.controls.country.value;
      this.sellHouseForm.photos = this.photos;
      this.sellHouseForm.Address = this.mainPropertyCharacteristic.controls.street.value;
      this.sellHouseForm.Characteristics = characteristicsToAdd;
      this.sellHouseForm.Description = this.mainPropertyCharacteristic.controls.description.value;
      this.sellHouseForm.Typology = this.mainPropertyCharacteristic.controls.propertyTypeId.value;
      console.log(this.sellHouseForm);
      this.publishListing.emit(this.sellHouseForm);
    }
  }

  public addToProperty(item: Characteristics): void {
    let itemFound: Characteristics;
    itemFound = this.characteristics.find((i) => i.Id === item.Id);
    itemFound.addedToProperty = !itemFound.addedToProperty;
  }

}

function getComponent(components: any, name: string) {
  return components.filter(component => component.types[0] === name)[0];
}

function getLong(components: any, name: string) {
  const component = getComponent(components, name);
  return component && component.long_name;
}

function getShort(components: any, name: string) {
  const component = getComponent(components, name);
  return component && component.short_name;
}
