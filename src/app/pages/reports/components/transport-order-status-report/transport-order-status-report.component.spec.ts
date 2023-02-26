import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOrderStatusReportComponent } from './transport-order-status-report.component';

describe('TransportOrderStatusReportComponent', () => {
  let component: TransportOrderStatusReportComponent;
  let fixture: ComponentFixture<TransportOrderStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportOrderStatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOrderStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
