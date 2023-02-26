/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaqsService } from './faqs.service';

describe('Service: Faqs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaqsService]
    });
  });

  it('should ...', inject([FaqsService], (service: FaqsService) => {
    expect(service).toBeTruthy();
  }));
});
