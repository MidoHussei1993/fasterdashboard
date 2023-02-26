import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOrderNotificationListComponent } from './transport-order-notification-list.component';

describe('TransportOrderNotificationListComponent', () => {
  let component: TransportOrderNotificationListComponent;
  let fixture: ComponentFixture<TransportOrderNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportOrderNotificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOrderNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
