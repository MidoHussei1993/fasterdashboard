export class IdentityFilter {
  constructor(){
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
  }
  PageNumber: number;
  PageSize: number;
  typeEnum: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
}
