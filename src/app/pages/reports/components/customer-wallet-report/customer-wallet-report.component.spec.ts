import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWalletReportComponent } from './customer-wallet-report.component';

describe('CustomerWalletReportComponent', () => {
  let component: CustomerWalletReportComponent;
  let fixture: ComponentFixture<CustomerWalletReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWalletReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWalletReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
