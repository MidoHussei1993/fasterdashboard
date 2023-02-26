export class ProductFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.Product = null;
    this.ProductAr = null;
    this.ShopId = null;
    // this.CategoryId = null;
    this.IsOffer = null;
  }
  PageNumber: number;
  PageSize: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  ProductAr: string;
  Product: string;
  ShopId: number;
  CategoryId: number;
  IsOffer: boolean;
}
