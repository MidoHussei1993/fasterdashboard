export class BundleOfferFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.ExpiryDateFrom = null;
    this.ExpiryDateTo = null;
    this.BundleName = null;
    this.BundleNameAr = null;
  }
  PageNumber: number;
  PageSize: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  ExpiryDateFrom: string;
  ExpiryDateTo: string;
  BundleName: string;
  BundleNameAr: string;
}
