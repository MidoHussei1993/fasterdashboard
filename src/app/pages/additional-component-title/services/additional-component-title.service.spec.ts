/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdditionalComponentTitleService } from './additional-component-title.service';

describe('Service: AdditionalComponentTitle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionalComponentTitleService]
    });
  });

  it('should ...', inject([AdditionalComponentTitleService], (service: AdditionalComponentTitleService) => {
    expect(service).toBeTruthy();
  }));
});
