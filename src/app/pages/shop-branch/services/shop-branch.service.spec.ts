import { TestBed } from '@angular/core/testing';

import { ShopBranchService } from './shop-branch.service';

describe('ShopBranchService', () => {
  let service: ShopBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
