export class OrderReportFilter {
  constructor(startdata?: any) {
    this.Id = null;
    if (startdata === null) {
      this.StartDate = null;
    }
    this.EndDate = null;
    this.ShopId = null;
    this.ProviderId = null;
    this.CustomerId = null;
    this.CustomerPhone = null;
    this.ProviderPhone = null;
  }
  PageNumber: number;
  PageSize: number;
  Id: number;
  ShopId: number;
  PayTypeId: number;
  StatusId: number;
  VendorId: number;
  ProviderId: number;
  CustomerId: number;
  CustomerPhone: string;
  ProviderPhone: string;
  OrderType: number;
  StartDate: Date;
  EndDate: string;
}
