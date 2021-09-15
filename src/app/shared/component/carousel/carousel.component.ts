import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() public items: Array<{ image: string }> = [];
  constructor() { }

  ngOnInit(): void {
  }

  
fireEvent(e) {
  e.stopPropagation();
  return false;
}
}
