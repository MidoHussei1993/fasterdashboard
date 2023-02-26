/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransportOrderService } from './transport-order.service';

describe('Service: TransportOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportOrderService]
    });
  });

  it('should ...', inject([TransportOrderService], (service: TransportOrderService) => {
    expect(service).toBeTruthy();
  }));
});
