/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManufacturingYearService } from './manufacturing-year.service';

describe('Service: ManufacturingYear', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManufacturingYearService]
    });
  });

  it('should ...', inject([ManufacturingYearService], (service: ManufacturingYearService) => {
    expect(service).toBeTruthy();
  }));
});
