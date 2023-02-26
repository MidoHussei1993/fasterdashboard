/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdditionalOptionService } from './additional-option.service';

describe('Service: AdditionalOption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionalOptionService]
    });
  });

  it('should ...', inject([AdditionalOptionService], (service: AdditionalOptionService) => {
    expect(service).toBeTruthy();
  }));
});
