import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponentCrudComponent } from './product-component-crud.component';

describe('ProductComponentCrudComponent', () => {
  let component: ProductComponentCrudComponent;
  let fixture: ComponentFixture<ProductComponentCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponentCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
