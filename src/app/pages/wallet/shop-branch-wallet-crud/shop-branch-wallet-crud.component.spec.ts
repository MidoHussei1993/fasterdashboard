import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBranchWalletCrudComponent } from './shop-branch-wallet-crud.component';

describe('ShopBranchWalletCrudComponent', () => {
  let component: ShopBranchWalletCrudComponent;
  let fixture: ComponentFixture<ShopBranchWalletCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBranchWalletCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBranchWalletCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
