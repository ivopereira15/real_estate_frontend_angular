import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PropertyBasic } from '../../models/listing/property-basic';

@Component({
  selector: 'app-list-of-cards',
  templateUrl: './list-of-cards.component.html',
  styleUrls: ['./list-of-cards.component.scss']
})
export class ListOfCardsComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  @Input() promotedProperties: PropertyBasic[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }

}
