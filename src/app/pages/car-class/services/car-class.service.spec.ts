/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarClassService } from './car-class.service';

describe('Service: CarClass', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarClassService]
    });
  });

  it('should ...', inject([CarClassService], (service: CarClassService) => {
    expect(service).toBeTruthy();
  }));
});
