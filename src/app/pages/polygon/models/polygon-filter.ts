import { Filter } from 'src/app/shared';

export class PolygonFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
  }
  PageNumber: number;
  PageSize: number;
  polygonType: number;
  orderType: number;
  CreateAtTo: Date;
  CreateAtFrom: Date;
}
