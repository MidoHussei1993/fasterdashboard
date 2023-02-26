import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponentListComponent } from './product-component-list.component';

describe('ProductComponentListComponent', () => {
  let component: ProductComponentListComponent;
  let fixture: ComponentFixture<ProductComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
