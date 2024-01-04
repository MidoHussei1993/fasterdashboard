import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedDeliveryOrderComponent } from './closed-delivery-order.component';

describe('ClosedDeliveryOrderComponent', () => {
  let component: ClosedDeliveryOrderComponent;
  let fixture: ComponentFixture<ClosedDeliveryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedDeliveryOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedDeliveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
