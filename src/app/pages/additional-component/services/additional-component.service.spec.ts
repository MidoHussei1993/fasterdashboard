/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdditionalComponentService } from './additional-component.service';

describe('Service: AdditionalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionalComponentService]
    });
  });

  it('should ...', inject([AdditionalComponentService], (service: AdditionalComponentService) => {
    expect(service).toBeTruthy();
  }));
});
