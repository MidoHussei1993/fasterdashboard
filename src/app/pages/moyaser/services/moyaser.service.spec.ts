/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoyaserService } from './moyaser.service';

describe('Service: Moyaser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoyaserService]
    });
  });

  it('should ...', inject([MoyaserService], (service: MoyaserService) => {
    expect(service).toBeTruthy();
  }));
});
