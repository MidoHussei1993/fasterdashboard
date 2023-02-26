export class AdditionalOptionFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Name = null;
      }
      PageNumber: number;
      PageSize: number;
      Name: string;
      CreateAtTo: Date;
      CreateAtFrom: Date;
}