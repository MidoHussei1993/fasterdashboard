import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderStatusReportComponent } from './delivery-order-status-report.component';

describe('DeliveryOrderStatusReportComponent', () => {
  let component: DeliveryOrderStatusReportComponent;
  let fixture: ComponentFixture<DeliveryOrderStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrderStatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
