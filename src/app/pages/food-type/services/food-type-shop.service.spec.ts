/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoodTypeShopService } from './food-type-shop.service';

describe('Service: FoodTypeShop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodTypeShopService]
    });
  });

  it('should ...', inject([FoodTypeShopService], (service: FoodTypeShopService) => {
    expect(service).toBeTruthy();
  }));
});
