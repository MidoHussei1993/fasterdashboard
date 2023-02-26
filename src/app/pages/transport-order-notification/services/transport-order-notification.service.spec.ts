/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransportOrderNotificationService } from './transport-order-notification.service';

describe('Service: TransportOrderNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportOrderNotificationService]
    });
  });

  it('should ...', inject([TransportOrderNotificationService], (service: TransportOrderNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
