export class CountryFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.CountryName = null;
    this.CountryNameAr = null;
  }
  PageNumber: number;
  PageSize: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  CountryName: string;
  CountryNameAr: string;
}
