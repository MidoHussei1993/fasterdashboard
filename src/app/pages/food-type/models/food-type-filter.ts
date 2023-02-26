import { Filter } from 'src/app/shared';

export class FoodTypeFilter {
  constructor() {
    this.IsActive = null;
    this.Name = null;
  }
  PageNumber: number;
  PageSize: number;
  Name: string;
  IsActive: boolean;
}
