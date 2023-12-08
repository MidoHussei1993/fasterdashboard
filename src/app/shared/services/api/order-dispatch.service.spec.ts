/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderDispatchService } from './order-dispatch.service';

describe('Service: OrderDispatch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderDispatchService]
    });
  });

  it('should ...', inject([OrderDispatchService], (service: OrderDispatchService) => {
    expect(service).toBeTruthy();
  }));
});
