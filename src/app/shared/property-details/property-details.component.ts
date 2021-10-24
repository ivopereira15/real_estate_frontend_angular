import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Property } from '../models/listing/property';

import { Characteristics } from '../models/listing/characteristics';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailService } from '../../core/services/api/email.service';
import { MapPoint } from '../models/map/map-point';
import { CustomValidators } from '../../core/services/shared/custom_validations';
import { EmailInput } from '../models/email/email-input';



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

  submitContact = false;
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
    public form: FormBuilder,
    public emailService: EmailService) {
    this.contactForm = this.form.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, CustomValidators.validatePhone]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.router.navigate([], { fragment: 'targetBlue' });
    if (this.property) {
      console.log(this.property);
      this.property.Images.forEach(i => {
        this.items.push({ image: i.ImageUrl });
        this.mapPoint = new MapPoint();
        this.mapPoint.latitude = this.property.Latitude;
        this.mapPoint.longitude = this.property.Longitude;
        console.log(this.mapPoint)
      });;

    }
  }

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  get c() {
    return this.contactForm as FormGroup;
  }

  close(): void {
    this.modalService.dismissAll();
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  public onSubmit() {
    this.submitContact = true;

    if (this.contactForm.valid) {
      const email = new EmailInput();
      email.FirstUserEmail = this.contactForm.value.email;

      email.SecondUserId = this.property.UserId;
      email.Message = this.contactForm.value.message;

      this.emailService.sendEmail(email).subscribe();

    } else {
      // error
    }

  }
}
