/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShopBranchWalletService } from './shop-branch-wallet.service';

describe('Service: ShopBranchWallet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopBranchWalletService]
    });
  });

  it('should ...', inject([ShopBranchWalletService], (service: ShopBranchWalletService) => {
    expect(service).toBeTruthy();
  }));
});
