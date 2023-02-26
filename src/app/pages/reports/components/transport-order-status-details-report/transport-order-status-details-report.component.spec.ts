import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOrderStatusDetailsReportComponent } from './transport-order-status-details-report.component';

describe('TransportOrderStatusDetailsReportComponent', () => {
  let component: TransportOrderStatusDetailsReportComponent;
  let fixture: ComponentFixture<TransportOrderStatusDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportOrderStatusDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOrderStatusDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
