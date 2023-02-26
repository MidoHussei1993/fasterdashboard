/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MotivationService } from './motivation.service';

describe('Service: Motivation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MotivationService]
    });
  });

  it('should ...', inject([MotivationService], (service: MotivationService) => {
    expect(service).toBeTruthy();
  }));
});
