/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BundleProductService } from './bundle-product.service';

describe('Service: BundleProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BundleProductService]
    });
  });

  it('should ...', inject([BundleProductService], (service: BundleProductService) => {
    expect(service).toBeTruthy();
  }));
});
