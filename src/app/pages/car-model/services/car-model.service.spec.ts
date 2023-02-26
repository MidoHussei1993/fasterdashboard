/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarModelService } from './car-model.service';

describe('Service: CarModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarModelService]
    });
  });

  it('should ...', inject([CarModelService], (service: CarModelService) => {
    expect(service).toBeTruthy();
  }));
});
