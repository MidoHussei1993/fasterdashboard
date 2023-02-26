import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderNotificationCrudComponent } from './delivery-order-notification-crud.component';

describe('DeliveryOrderNotificationCrudComponent', () => {
  let component: DeliveryOrderNotificationCrudComponent;
  let fixture: ComponentFixture<DeliveryOrderNotificationCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrderNotificationCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderNotificationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
