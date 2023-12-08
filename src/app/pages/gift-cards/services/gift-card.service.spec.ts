/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GiftCardService } from './gift-card.service';

describe('Service: GiftCard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiftCardService]
    });
  });

  it('should ...', inject([GiftCardService], (service: GiftCardService) => {
    expect(service).toBeTruthy();
  }));
});
