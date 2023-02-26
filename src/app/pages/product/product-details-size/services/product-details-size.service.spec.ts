/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductDetailsSizeService } from './product-details-size.service';

describe('Service: ProductDetailsSize', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailsSizeService]
    });
  });

  it('should ...', inject([ProductDetailsSizeService], (service: ProductDetailsSizeService) => {
    expect(service).toBeTruthy();
  }));
});
