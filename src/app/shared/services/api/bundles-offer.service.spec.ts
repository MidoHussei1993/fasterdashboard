/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BundlesOfferService } from './bundles-offer.service';

describe('Service: BundlesOffer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BundlesOfferService]
    });
  });

  it('should ...', inject([BundlesOfferService], (service: BundlesOfferService) => {
    expect(service).toBeTruthy();
  }));
});
