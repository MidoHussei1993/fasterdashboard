export class OfferFilter {
  constructor() {
    this.ProductId = null;
    this.ExpiryDateFrom = null;
    this.ExpiryDateTo = null;
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.Description = null;
    this.DescriptionAr = null;
  }
  PageNumber: number;
  PageSize: number;
  ProductId:number;
  ExpiryDateFrom: string;
  ExpiryDateTo: string;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  Description: string;
  DescriptionAr: string;
}
