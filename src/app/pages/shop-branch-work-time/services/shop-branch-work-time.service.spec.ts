import { TestBed } from '@angular/core/testing';

import { ShopBranchWorkTimeService } from './shop-branch-work-time.service';

describe('ShopBranchWorkTimeService', () => {
  let service: ShopBranchWorkTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopBranchWorkTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
