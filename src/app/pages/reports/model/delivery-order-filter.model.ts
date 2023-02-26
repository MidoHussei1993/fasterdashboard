export class DeliveryOrderFilter {
    constructor() {
      this.StartDate = null;
      this.EndDate = null;
      this.ProviderId = null;
      this.CustomerId = null;
      this.ShopBranchId = null;
    }
    PageNumber: number;
    PageSize: number;
    StatusId: number;
    ProviderId: number;
    CustomerId: number;
    ShopId: number;
    ShopBranchId: number;
    StartDate: Date;
    EndDate: Date;
  }
  