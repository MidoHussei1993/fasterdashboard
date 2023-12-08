import { Filter } from 'src/app/shared';

export class FoodTypeShopFilter extends Filter {
  constructor() {
    super();
    this.ProductDetailsId = null;
    this.FoodTypeId = null;
  }

  ShopId: number;
  FoodTypeId: number;
  ProductDetailsId: number;
}
