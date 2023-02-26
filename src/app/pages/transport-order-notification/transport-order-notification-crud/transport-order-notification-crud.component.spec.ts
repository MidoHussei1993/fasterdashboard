import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOrderNotificationCrudComponent } from './transport-order-notification-crud.component';

describe('TransportOrderNotificationCrudComponent', () => {
  let component: TransportOrderNotificationCrudComponent;
  let fixture: ComponentFixture<TransportOrderNotificationCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportOrderNotificationCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOrderNotificationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
