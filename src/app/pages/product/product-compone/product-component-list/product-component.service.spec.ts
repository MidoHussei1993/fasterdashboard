/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductComponentService } from './product-component.service';

describe('Service: ProductComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductComponentService]
    });
  });

  it('should ...', inject([ProductComponentService], (service: ProductComponentService) => {
    expect(service).toBeTruthy();
  }));
});
