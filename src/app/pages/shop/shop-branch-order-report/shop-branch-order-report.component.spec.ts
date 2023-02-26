import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBranchOrderReportComponent } from './shop-branch-order-report.component';

describe('ShopBranchOrderReportComponent', () => {
  let component: ShopBranchOrderReportComponent;
  let fixture: ComponentFixture<ShopBranchOrderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBranchOrderReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBranchOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
