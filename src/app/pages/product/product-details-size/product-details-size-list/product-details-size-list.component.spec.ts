import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSizeListComponent } from './product-details-size-list.component';

describe('ProductDetailsSizeListComponent', () => {
  let component: ProductDetailsSizeListComponent;
  let fixture: ComponentFixture<ProductDetailsSizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsSizeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
