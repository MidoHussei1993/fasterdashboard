/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductAdditionalOptionService } from './product-additional-option.service';

describe('Service: ProductAdditionalOption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductAdditionalOptionService]
    });
  });

  it('should ...', inject([ProductAdditionalOptionService], (service: ProductAdditionalOptionService) => {
    expect(service).toBeTruthy();
  }));
});
