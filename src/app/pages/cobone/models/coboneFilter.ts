export class CoboneFilter {
  constructor() {
    this.ShopId = null;
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.ExpiryDateFrom = null;
    this.ExpiryDateTo = null;
    this.ShopName = null;
    this.ShopNameAr = null;
    this.CoboneCode = null;
    // this.IsActive = null;
  }
  PageNumber: number;
  PageSize: number;
  ShopId: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  ExpiryDateFrom: string;
  ExpiryDateTo: string;
  ShopName: string;
  ShopNameAr: string;
  CoboneCode:string;
  IsActive:boolean;
}
