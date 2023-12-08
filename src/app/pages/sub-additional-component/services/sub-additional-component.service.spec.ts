/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubAdditionalComponentService } from './sub-additional-component.service';

describe('Service: SubAdditionalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubAdditionalComponentService]
    });
  });

  it('should ...', inject([SubAdditionalComponentService], (service: SubAdditionalComponentService) => {
    expect(service).toBeTruthy();
  }));
});
