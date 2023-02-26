export class IgnoredOrderFilter {
  constructor() {
    this.StartDate = null;
    this.EndDate = null;
    this.OrderId = null;
  }
  PageNumber: number;
  PageSize: number;
  OrderId: number;
  OrderType: number;
  OrderStatus: number;
  StartDate: Date;
  EndDate: Date;
}
