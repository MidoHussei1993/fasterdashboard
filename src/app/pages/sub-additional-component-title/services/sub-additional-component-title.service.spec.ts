/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubAdditionalComponentTitleService } from './sub-additional-component-title.service';

describe('Service: SubAdditionalComponentTitle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubAdditionalComponentTitleService]
    });
  });

  it('should ...', inject([SubAdditionalComponentTitleService], (service: SubAdditionalComponentTitleService) => {
    expect(service).toBeTruthy();
  }));
});
