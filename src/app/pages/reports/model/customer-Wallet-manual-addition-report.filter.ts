export class CustomerWalletManualAdditionReport {
  constructor() {
    this.CustomerId = null;
    this.CustomerPhone = null;
    this.CustomerName = null;
    this.StartDate = null;
    this.EndDate = null;
    this.IsActive = null;
  }
  PageNumber: number;
  PageSize: number;
  IsActive: boolean;
  CustomerId: number;
  CustomerPhone: string;
  CustomerName: string;
  StartDate: string;
  EndDate: string;
  TransactionType: string;
}
