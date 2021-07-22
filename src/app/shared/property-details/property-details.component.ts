import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Property } from '../models/listing/property';
import { PropertyBasic } from 'src/app/shared/models/listing/property-basic';
import { SearchProperty } from 'src/app/shared/models/search/search-property';
import { MapPoint } from 'src/app/shared/models/map/map-point';

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
  constructor(
    public modalService: NgbModal,
    public route: ActivatedRoute,
    public router: Router) {

    }
  ngOnInit(): void {
    if (this.property.Images) {
      console.log(this.property.Images);
      this.property.Images.forEach(i => {
        this.items.push({ image: i.ImageUrl });
        console.log(this.items);
      });
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
