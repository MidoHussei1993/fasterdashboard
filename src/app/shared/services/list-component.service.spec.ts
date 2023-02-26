/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListComponentService } from './list-component.service';

describe('Service: ListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListComponentService]
    });
  });

  it('should ...', inject([ListComponentService], (service: ListComponentService) => {
    expect(service).toBeTruthy();
  }));
});
