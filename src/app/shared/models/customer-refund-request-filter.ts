import { Filter } from './filter.model';

export class CustomerNoteFilter extends Filter {
  constructor() {
    super();
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
  }

  Note: string;
  Type: number;
}
