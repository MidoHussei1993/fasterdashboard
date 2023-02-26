import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSizeCrudComponent } from './product-details-size-crud.component';

describe('ProductDetailsSizeCrudComponent', () => {
  let component: ProductDetailsSizeCrudComponent;
  let fixture: ComponentFixture<ProductDetailsSizeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsSizeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsSizeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
