/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PolygonService } from './polygon.service';

describe('Service: Polygon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolygonService]
    });
  });

  it('should ...', inject([PolygonService], (service: PolygonService) => {
    expect(service).toBeTruthy();
  }));
});
