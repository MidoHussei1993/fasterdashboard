/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderStatusService } from './order-status.service';

describe('Service: OrderStatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderStatusService]
    });
  });

  it('should ...', inject([OrderStatusService], (service: OrderStatusService) => {
    expect(service).toBeTruthy();
  }));
});
