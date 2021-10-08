import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchOnViewComponent } from './filter-search-on-view.component';

describe('FilterSearchOnViewComponent', () => {
  let component: FilterSearchOnViewComponent;
  let fixture: ComponentFixture<FilterSearchOnViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSearchOnViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSearchOnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
