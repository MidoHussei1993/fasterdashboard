export class ProviderWalletManualAdditionReport {
  constructor() {
    // this.RegisterType = null;
    this.ProviderId = null;
    this.ProviderPhone = null;
    this.ProviderName = null;
    this.StartDate = null;
    this.EndDate = null;
    this.IsActive = null;
  }
  PageNumber: number;
  PageSize: number;
  RegisterType: number;
  IsActive: boolean;
  ProviderId: number;
  ProviderPhone: string;
  ProviderName: string;
  StartDate: string;
  EndDate: string;
  TransactionType: string;
}
