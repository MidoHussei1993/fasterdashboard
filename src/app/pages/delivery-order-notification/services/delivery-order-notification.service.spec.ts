/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeliveryOrderNotificationService } from './delivery-order-notification.service';

describe('Service: DeliveryOrderNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryOrderNotificationService]
    });
  });

  it('should ...', inject([DeliveryOrderNotificationService], (service: DeliveryOrderNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
