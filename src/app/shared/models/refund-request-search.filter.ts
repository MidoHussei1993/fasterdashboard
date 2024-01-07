import { Filter } from './filter.model';

export class RefundRequestSearchFilter extends Filter {
  constructor() {
    super();
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.Note = '';
  }
  Type: number;
  Note: string;
}
