export class CityFilter {
  constructor(){
    this.CityName = null;
    this.CityNameAr = null;
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
  }
  PageNumber: number;
  PageSize: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  CityName: string;
  CityNameAr: string;
}
