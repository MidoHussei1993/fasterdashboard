import { TestBed } from '@angular/core/testing';

import { GeneralSuggestService } from './general-suggest.service';

describe('GeneralSuggestService', () => {
  let service: GeneralSuggestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralSuggestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
