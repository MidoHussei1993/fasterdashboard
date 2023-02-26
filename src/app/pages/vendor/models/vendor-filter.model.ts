export class VendorFilter {
    constructor() {
      this.FullName = null;
      this.CreateAtFrom = null;
      this.CreateAtTo = null;
      this.Email = null;
      this.PhoneNumber = null;
    }
    PageNumber: number;
    PageSize: number;
    IsActive: boolean;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    FullName: string;
    Email: string;
    PhoneNumber: string;
  }
  