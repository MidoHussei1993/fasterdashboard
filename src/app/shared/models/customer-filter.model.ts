export class CustomerFilter{
    constructor(){
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.CustomerId = null;
        this.IsActive = null;
        this.phoneNumber = null;
      }
      PageNumber: number;
      PageSize: number;
      CustomerId: number;
      IsActive: boolean;
      phoneNumber: number;
      CreateAtFrom: Date;
      CreateAtTo: Date;
}