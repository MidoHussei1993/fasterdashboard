import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkBranchWalletComponent } from './bulk-branch-wallet.component';

describe('BulkBranchWalletComponent', () => {
  let component: BulkBranchWalletComponent;
  let fixture: ComponentFixture<BulkBranchWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkBranchWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkBranchWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
