export class CategoryFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.IsActive = null;
    this.CategoryName = null;
    this.CategoryNameAr = null;
  }
  PageNumber: number;
  PageSize: number;
  IsActive:boolean;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  CategoryName:string;
  CategoryNameAr:string;
}
