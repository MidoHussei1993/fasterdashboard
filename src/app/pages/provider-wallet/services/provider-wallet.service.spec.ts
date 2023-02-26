import { TestBed } from '@angular/core/testing';

import { ProviderWalletService } from './provider-wallet.service';

describe('ProviderWalletService', () => {
  let service: ProviderWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
