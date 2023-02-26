export class TaxsReportFilter {
  constructor() {
    this.StartDate = null;
    this.EndDate = null;
  }
  PageNumber: number;
  PageSize: number;
  StartDate: string;
  EndDate: string;
}
