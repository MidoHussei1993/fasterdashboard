/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemSizeService } from './item-size.service';

describe('Service: ItemSize', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemSizeService]
    });
  });

  it('should ...', inject([ItemSizeService], (service: ItemSizeService) => {
    expect(service).toBeTruthy();
  }));
});
