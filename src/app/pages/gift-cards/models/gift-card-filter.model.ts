import { Filter } from 'src/app/shared';

export class GiftCardFilter extends Filter {
  constructor() {
    super();
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.Title = null;
  }
  Title: string;
}
