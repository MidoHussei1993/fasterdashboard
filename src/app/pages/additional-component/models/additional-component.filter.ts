export class AdditionalComponentFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Name = null;
        this.AdditionalComponentTitleId = null;
      }
      PageNumber: number;
      PageSize: number;
      Name: string;
      AdditionalComponentTitleId: number;
      CreateAtTo: Date;
      CreateAtFrom: Date;
}