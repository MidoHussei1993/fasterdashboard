import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { ShopService } from '../../shop/services';
import { FoodTypeFilter } from '../models/food-type-filter';
import { FoodTypeShopFilter } from '../models/food-type-shop-filter';
import { FoodTypeShopService } from '../services/food-type-shop.service';
import { FoodTypeService } from '../services/food-type.service';

@Component({
  selector: 'app-food-type-shop',
  templateUrl: './food-type-shop.component.html',
  styleUrls: ['./food-type-shop.component.scss'],
})
export class FoodTypeShopComponent
  extends ListComponent<any, FoodTypeShopFilter>
  implements OnInit
{
  isShopId: boolean = false;

  constructor(
    private foodTypeService: FoodTypeService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private shopService: ShopService,
    private foodTypeShopService: FoodTypeShopService
  ) {
    super(foodTypeShopService, notifier, spinner, translate, route, router);
    this.titles = [
      'field.foodTypeName',
      'field.foodTypeNameAr',
      'field.ShopName',
      'field.ShopNameAr',
    ];
    this.properties = [
      'foodTypeName',
      'foodTypeNameAr',
      'shopName',
      'shopNameAr',
    ];
  }

  ngOnInit(): void {
    this.navigateTo = 'food-type';
    this.filter = new FoodTypeShopFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    if (this.route.snapshot.queryParams.shopId) {
      this.filter.ShopId = this.route.snapshot.queryParams.shopId;
      this.isShopId = true;
    }
    if (this.route.snapshot.queryParams.productDetailsId) {
      this.filter.ProductDetailsId =
        this.route.snapshot.queryParams.productDetailsId;
    }
    this.getList();
  }

  getFoodTypesByShopId() {
    console.log('get list of items');
    this.spinner.show();
    this.shopService
      .getFoodTypesByShopId(+this.route.snapshot.queryParamMap.get('shopId'))
      .subscribe(
        (res: any) => {
          console.log(res);
          this.spinner.hide();
          this.list = res;
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }

  navigateTO(item: { event: any; type: string }) {
    switch (item.type) {
      case 'productDetails':
        const create = this.router.serializeUrl(
          this.router.createUrlTree([
            `/product/${item.event.productDetailsId}/details/list`,
          ])
        );
        window.open(create, '_blank');
        break;

      default:
        break;
    }
  }

  resetfilter() {
    this.filter = new FoodTypeFilter();
  }
  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.foodTypeService
      .ChangeActivation(String(this.list[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  deleteItem(item) {
    this.spinner.show();
    this.foodTypeShopService.delete(item.id).subscribe(
      (res: any) => {
        this.getList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  navigateToCreateFoodShop() {
    if (this.isShopId)
      return this.router.navigateByUrl(
        `/food-type/create-food-shop?shopId=${this.route.snapshot.queryParamMap.get(
          'shopId'
        )}`
      );
    else return this.router.navigateByUrl(`/food-type/create-food-shop`);
  }
  navigateToCreateFoodShopByProductDetailsId() {
    this.router.navigateByUrl(
      `/food-type/product/${this.route.snapshot.queryParams.productDetailsId}`
    );
  }
}
