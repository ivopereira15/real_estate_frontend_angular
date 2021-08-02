import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Property } from '../models/listing/property';
import { MapPoint } from 'src/app/shared/models/map/map-point';
import { Characteristics } from '../models/listing/characteristics';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CustomValidators} from 'src/app/core/services/shared/custom_validations';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  @Input() public property: Property;
  public contactForm: FormGroup;
  public formErrors = {
    name: '',
    email: '',
    phone: ''
  };

  submitContact: boolean = false;
  currentIndex: any = -1;
  showFlag: any = false;
  items: Array<{ image: string }> = [];
  assetLink = 'assets/';
  characteristics: Characteristics[] = [];
  public mapPoint: MapPoint;
  constructor(
    public modalService: NgbModal,
    public route: ActivatedRoute,
    public router: Router,
    public form: FormBuilder) {
      this.contactForm = this.form.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required, CustomValidators.validatePhone]],
        email: ['', [Validators.required, Validators.email]],
      });

      console.log(this.c.controls.phone);
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

  get c() {
    return this.contactForm as FormGroup;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  public onSubmit() {
    this.submitContact = true;

    if (this.contactForm.valid) {
      // sucess
    } else {
      // error
    }

  }

}
