import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OperationType } from '../../models/listing/operation-type';
import { PropertyType } from '../../models/listing/property-type';
import { SellHouse } from '../../models/listing/sell-house';

@Component({
  selector: 'app-sell-house',
  templateUrl: './sell-house.component.html',
  styleUrls: ['./sell-house.component.scss']
})
export class SellHouseComponent implements OnInit {

  @Input() public sellHouseForm: SellHouse;
  @Input() public operationTypes: OperationType[];
  @Input() public propertyTypes: PropertyType[];
  @Input() public title: string;
  @Output() public publishListing: EventEmitter<any> = new EventEmitter<any>();

  typology: string[] = ["T0", "T1", "T2", "T3"];
  bathrooms: number[] = [1, 2, 3, 4, 5];
  floors: number[] = [1, 2, 3, 4, 5];
  energyCertificate: string[] = ["A", "B", "C", "D"];
  countries: string[] = ["Italy", "Ukraine", "Portugal"];
  thumbnails = [];

  // sellHouseForm: SellHouse;
  // operationTypes: OperationType[];
  // currentOperationType: OperationType;
  // propertyTypes: PropertyType[];

  constructor() { }

  ngOnInit(): void {
  }

  public uploadImage(image: any): void {
    let uploadedImage: File = image.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(uploadedImage);
    reader.onload = (_event) => {
      let result = reader.result;
      this.thumbnails.push(result);
    };
  }

  publishListingSubmit() {
    this.publishListing.emit(this.sellHouseForm);
  }

}
