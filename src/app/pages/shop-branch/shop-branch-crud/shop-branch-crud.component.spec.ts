import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBranchCrudComponent } from './shop-branch-crud.component';

describe('ShopBranchCrudComponent', () => {
  let component: ShopBranchCrudComponent;
  let fixture: ComponentFixture<ShopBranchCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBranchCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBranchCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
