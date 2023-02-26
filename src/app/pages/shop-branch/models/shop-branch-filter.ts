export class ShopBranchFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.ApplicationUserId = null;
    this.IsActive = null;
    this.ShopId = null;
    this.ShopBranchId = null;
  }
  PageNumber: number;
  PageSize: number;
  IsActive: boolean;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  ApplicationUserId: string;
  ShopId: number;
  CityId: number;
  ShopBranchId: number;
}
