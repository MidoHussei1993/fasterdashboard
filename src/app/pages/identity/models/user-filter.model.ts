export class UserFilter{
    constructor(){
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.FullName = null;
        this.Email = null;
        this.PhoneNumber = null;
        this.IdentificationNumber = null;
      }
      PageNumber: number;
      PageSize: number;
      CreateAtFrom: Date;
      CreateAtTo: Date;
      FullName: string;
      Email: string;
      PhoneNumber: string;
      IdentificationNumber: string;
}