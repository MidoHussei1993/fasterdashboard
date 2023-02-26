import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderWalletReportComponent } from './provider-wallet-report.component';

describe('ProviderWalletReportComponent', () => {
  let component: ProviderWalletReportComponent;
  let fixture: ComponentFixture<ProviderWalletReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderWalletReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderWalletReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
