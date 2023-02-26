import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdditionalOptionsListComponent } from './product-additional-options-list.component';

describe('ProductAdditionalOptionsListComponent', () => {
  let component: ProductAdditionalOptionsListComponent;
  let fixture: ComponentFixture<ProductAdditionalOptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAdditionalOptionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdditionalOptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
