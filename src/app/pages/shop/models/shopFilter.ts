export class ShopFilter {
  constructor() {
    this.ApplicationUserId = null;
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.ShopName = null;
    // this.ShopNameAr = null;
  }
  PageNumber: number;
  PageSize: number;
  ShopTypeId: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  ApplicationUserId: string;
  ShopName: string;
  ShopNameAr: string;
}
