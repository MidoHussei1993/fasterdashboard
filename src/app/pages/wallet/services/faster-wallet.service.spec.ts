/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FasterWalletService } from './faster-wallet.service';

describe('Service: FasterWallet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FasterWalletService]
    });
  });

  it('should ...', inject([FasterWalletService], (service: FasterWalletService) => {
    expect(service).toBeTruthy();
  }));
});
