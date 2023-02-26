/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FixedShopAmountService } from './fixed-shop-amount.service';

describe('Service: FixedShopAmount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixedShopAmountService]
    });
  });

  it('should ...', inject([FixedShopAmountService], (service: FixedShopAmountService) => {
    expect(service).toBeTruthy();
  }));
});
