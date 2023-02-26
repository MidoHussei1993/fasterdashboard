import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBranchCrudComponent } from './product-branch-crud.component';

describe('ProductBranchCrudComponent', () => {
  let component: ProductBranchCrudComponent;
  let fixture: ComponentFixture<ProductBranchCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBranchCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBranchCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
