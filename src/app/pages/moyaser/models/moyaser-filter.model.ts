export class MoyaserFilter {
  constructor() {
    this.CreatedAfter = null;
    this.CreatedBefore = null;
  }
  PageNumber: number;
  PageSize: number;
  Id: number;
  status: string;
  CreatedAfter: Date;
  CreatedBefore: Date;
}
