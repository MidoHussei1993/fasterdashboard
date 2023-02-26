import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderDetailsComponent } from './delivery-order-details.component';

describe('DeliveryOrderDetailsComponent', () => {
  let component: DeliveryOrderDetailsComponent;
  let fixture: ComponentFixture<DeliveryOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
