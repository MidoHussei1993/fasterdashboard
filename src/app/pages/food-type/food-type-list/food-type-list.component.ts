import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { AdditionalComponentTitleFilter } from '../../additional-component-title/models';
import { ShopService } from '../../shop/services';
import { FoodTypeFilter } from '../models/food-type-filter';
import { FoodTypeShopService } from '../services/food-type-shop.service';
import { FoodTypeService } from '../services/food-type.service';
import { FoodTypeShopFilter } from '../models/food-type-shop-filter';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-food-type-list',
  templateUrl: './food-type-list.component.html',
  styleUrls: ['./food-type-list.component.scss'],
})
export class FoodTypeListComponent
  extends ListComponent<any, AdditionalComponentTitleFilter>
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
    private headerService: HeaderService,
    private foodTypeShopService: FoodTypeShopService
  ) {
    super(foodTypeService, notifier, spinner, translate, route, router);
    this.titles = ['field.foodTypeName', 'field.foodTypeNameAr'];
    this.properties = ['foodTypeName', 'foodTypeNameAr'];
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.foodType'));
    this.navigateTo = 'food-type';
    this.filter = new FoodTypeFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.isShopId = this.route.snapshot.queryParamMap.get('shopId')
      ? true
      : false;
    if (this.isShopId) {
      this.getFoodTypesByShopId();
    } else {
      this.getList();
    }
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

  navigateToCreateFoodShop() {
    if (this.isShopId)
      return this.router.navigateByUrl(
        `/food-type/create-food-shop?shopId=${this.route.snapshot.queryParamMap.get(
          'shopId'
        )}`
      );
    else return this.router.navigateByUrl(`/food-type/create-food-shop`);
  }
}
