export class AddedFromPaymentReportFilter {
  constructor() {
    this.StartDate = null;
    this.EndDate = null;
    this.CustomerId = null;
  }
  PageNumber: number = 1;
  PageSize: number = 10;
  CustomerId: string;
  StartDate: string;
  EndDate: string;
}
