import { Filter } from 'src/app/shared';

export class ProviderAmountRequestFilter extends Filter {
  constructor() {
    super();
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.ProviderId = null;
  }
  ProviderId: number;
  IsTransferred: boolean | null;
}
