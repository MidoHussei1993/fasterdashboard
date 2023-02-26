import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdditionalOptionsCrudComponent } from './product-additional-options-crud.component';

describe('ProductAdditionalOptionsCrudComponent', () => {
  let component: ProductAdditionalOptionsCrudComponent;
  let fixture: ComponentFixture<ProductAdditionalOptionsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAdditionalOptionsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdditionalOptionsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
