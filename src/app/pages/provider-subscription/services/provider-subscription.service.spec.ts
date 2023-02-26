/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProviderSubscriptionService } from './provider-subscription.service';

describe('Service: ProviderSubscription', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderSubscriptionService]
    });
  });

  it('should ...', inject([ProviderSubscriptionService], (service: ProviderSubscriptionService) => {
    expect(service).toBeTruthy();
  }));
});
