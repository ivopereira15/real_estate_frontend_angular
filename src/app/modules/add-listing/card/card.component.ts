import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input() cardBgImage = '';
  @Input() cardText = '';
  @ViewChild('card', { static: true }) card: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
