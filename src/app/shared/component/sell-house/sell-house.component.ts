import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/services/shared/custom_validations';

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
  typology: string[] = ['T0', 'T1', 'T2', 'T3'];
  bathrooms: number[] = [1, 2, 3, 4, 5];
  floors: number[] = [1, 2, 3, 4, 5];
  rooms: number[] = [1, 2, 3, 4, 5];
  energyCertificate: string[] = ['A', 'B', 'C', 'D'];
  countries: string[] = ['Italy', 'Ukraine', 'Portugal'];
  thumbnails = [];
  photos = [];

  public mainPropertyCharacteristic: FormGroup;

  constructor(  public form: FormBuilder) {
    this.mainPropertyCharacteristic = this.form.group({
      price: ['', [Validators.required]],
      netAream2: [],
      priceNetAream2: [],
      grossAream2: [],
      propertyTypeId: [],
      floor: [],
      rooms: [],
      yearOfConstruction: [],
      numberOfBathrooms: []
    });
}

  ngOnInit(): void {

  }

  ngOnChanges(){
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

  publishListingSubmit() {
    this.sellHouseForm.photos = this.photos;
    this.publishListing.emit(this.sellHouseForm);
  }

}
