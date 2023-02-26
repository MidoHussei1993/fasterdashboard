export class ShopTypeFilter {
    constructor() {
      this.CreateAtFrom = null;
      this.CreateAtTo = null;
      this.Name = null;
      this.NameAr = null;
    }
    PageNumber: number;
    PageSize: number;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    Name: string;
    NameAr: string;
  }
  