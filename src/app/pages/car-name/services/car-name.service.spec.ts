/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarNameService } from './car-name.service';

describe('Service: CarName', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarNameService]
    });
  });

  it('should ...', inject([CarNameService], (service: CarNameService) => {
    expect(service).toBeTruthy();
  }));
});
