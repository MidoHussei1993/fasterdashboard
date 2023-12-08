import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAvailabilityComponent } from './product-availability.component';

describe('ProductAvailabilityComponent', () => {
  let component: ProductAvailabilityComponent;
  let fixture: ComponentFixture<ProductAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
