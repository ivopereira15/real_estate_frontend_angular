import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Property } from '../models/listing/property';
import { PropertyBasic } from 'src/app/shared/models/listing/property-basic';
import { SearchProperty } from 'src/app/shared/models/search/search-property';
import { MapPoint } from 'src/app/shared/models/map/map-point';
import { Characteristics } from '../models/listing/characteristics';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  @Input() public property: Property;
  currentIndex: any = -1;
  showFlag: any = false;
  items: Array<{ image: string }> = [];
  assetLink = 'assets/';
  characteristics: Characteristics[] = [];
  public mapPoint: MapPoint;
  constructor(
    public modalService: NgbModal,
    public route: ActivatedRoute,
    public router: Router) {
    }
  ngOnInit(): void {

    if (this.property) {
      this.property.Images.forEach(i => {
        this.items.push({ image: i.ImageUrl });
        this.mapPoint = new MapPoint();
        this.mapPoint.latitude = this.property.Latitude;
        this.mapPoint.longitude = this.property.Longitude;
      });


      const test = new Characteristics;
      test.Name = this.property.YearOfConstruction.toString();
      test.IconName = "propertydate";
      test.CountNumber = 22;
      this.characteristics.push(test);

      const test2 = new Characteristics;
      test2.Name = "Fireplate";
      test2.IconName = "fireplate";
      test2.CountNumber = 23;
      this.characteristics.push(test2);

      const test3 = new Characteristics;
      test3.Name = "Balcony";
      test3.IconName = "Balcony";
      test3.CountNumber = 24;
      this.characteristics.push(test3);
      console.log( this.characteristics);
    }
  }

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

}
