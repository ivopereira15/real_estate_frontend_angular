import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpFiltersComponent } from './pop-up-filters.component';

describe('PopUpFiltersComponent', () => {
  let component: PopUpFiltersComponent;
  let fixture: ComponentFixture<PopUpFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
