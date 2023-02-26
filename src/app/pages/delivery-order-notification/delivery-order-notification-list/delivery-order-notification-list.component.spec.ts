import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderNotificationListComponent } from './delivery-order-notification-list.component';

describe('DeliveryOrderNotificationListComponent', () => {
  let component: DeliveryOrderNotificationListComponent;
  let fixture: ComponentFixture<DeliveryOrderNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrderNotificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
