import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsCrudComponent } from './product-details-crud.component';

describe('ProductDetailsCrudComponent', () => {
  let component: ProductDetailsCrudComponent;
  let fixture: ComponentFixture<ProductDetailsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
