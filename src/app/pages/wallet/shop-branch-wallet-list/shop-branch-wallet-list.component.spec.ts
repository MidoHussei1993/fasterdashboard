import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBranchWalletListComponent } from './shop-branch-wallet-list.component';

describe('ShopBranchWalletListComponent', () => {
  let component: ShopBranchWalletListComponent;
  let fixture: ComponentFixture<ShopBranchWalletListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBranchWalletListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBranchWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
