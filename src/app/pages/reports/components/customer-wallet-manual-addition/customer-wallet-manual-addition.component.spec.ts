import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWalletManualAdditionComponent } from './customer-wallet-manual-addition.component';

describe('CustomerWalletManualAdditionComponent', () => {
  let component: CustomerWalletManualAdditionComponent;
  let fixture: ComponentFixture<CustomerWalletManualAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWalletManualAdditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWalletManualAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
