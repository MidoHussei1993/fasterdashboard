export class CustomerWalletFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.CustomerId = null;
        // this.Type = null;
      }
      PageNumber: number;
      PageSize: number;
      CreateAtFrom: Date;
      CreateAtTo: Date;
      CustomerId: number;
      Type: number;
      
}
