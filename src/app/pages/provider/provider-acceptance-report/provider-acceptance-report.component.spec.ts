import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAcceptanceReportComponent } from './provider-acceptance-report.component';

describe('ProviderAcceptanceReportComponent', () => {
  let component: ProviderAcceptanceReportComponent;
  let fixture: ComponentFixture<ProviderAcceptanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderAcceptanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAcceptanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
