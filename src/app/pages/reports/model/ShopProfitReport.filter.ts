export class ShopProfitReportFilter {
  constructor() {
    this.ShopId = null;
    this.ShopBranchId = null;
    this.StartDate = null;
    this.EndDate = null;
  }
  PageNumber: number;
  PageSize: number;
  ShopId: number;
  ShopBranchId: number;
  StartDate: string;
  EndDate: string;
}
