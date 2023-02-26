import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBranchListComponent } from './product-branch-list.component';

describe('ProductBranchListComponent', () => {
  let component: ProductBranchListComponent;
  let fixture: ComponentFixture<ProductBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBranchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
