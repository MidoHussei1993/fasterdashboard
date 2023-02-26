export class AdditionalComponentTitleFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.ProductDetailsId = null;
        this.Title = null;
      }
      PageNumber: number;
      PageSize: number;
      Title: string;
      ProductDetailsId: number;
      CreateAtTo: Date;
      CreateAtFrom: Date;
}