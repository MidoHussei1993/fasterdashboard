/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoodTypeService } from './food-type.service';

describe('Service: FoodType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodTypeService]
    });
  });

  it('should ...', inject([FoodTypeService], (service: FoodTypeService) => {
    expect(service).toBeTruthy();
  }));
});
