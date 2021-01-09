import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit {

  constructor(@Inject(Router) private router: Router,) { }

  ngOnInit(): void {
  }

  public search() {
    this.router.navigate(['/search']);
  }

}
