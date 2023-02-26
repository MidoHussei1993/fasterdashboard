export class ProviderNotesFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
  }
  ProviderId: number;
  PageNumber: number;
  PageSize: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
}
