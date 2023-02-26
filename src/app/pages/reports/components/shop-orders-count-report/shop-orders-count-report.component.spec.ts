import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrdersCountReportComponent } from './shop-orders-count-report.component';

describe('ShopOrdersCountReportComponent', () => {
  let component: ShopOrdersCountReportComponent;
  let fixture: ComponentFixture<ShopOrdersCountReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopOrdersCountReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOrdersCountReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
