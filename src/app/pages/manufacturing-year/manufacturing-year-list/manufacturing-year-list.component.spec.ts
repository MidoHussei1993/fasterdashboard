import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingYearListComponent } from './manufacturing-year-list.component';

describe('ManufacturingYearListComponent', () => {
  let component: ManufacturingYearListComponent;
  let fixture: ComponentFixture<ManufacturingYearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingYearListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingYearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
