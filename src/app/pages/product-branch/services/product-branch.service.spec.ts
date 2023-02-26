/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductBranchService } from './product-branch.service';

describe('Service: ProductBranch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductBranchService]
    });
  });

  it('should ...', inject([ProductBranchService], (service: ProductBranchService) => {
    expect(service).toBeTruthy();
  }));
});
