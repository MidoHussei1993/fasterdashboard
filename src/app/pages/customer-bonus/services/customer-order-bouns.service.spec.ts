/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerOrderBounsService } from './customer-order-bouns.service';

describe('Service: CustomerOrderBouns', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerOrderBounsService]
    });
  });

  it('should ...', inject([CustomerOrderBounsService], (service: CustomerOrderBounsService) => {
    expect(service).toBeTruthy();
  }));
});
