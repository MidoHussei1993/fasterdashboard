import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { AdditionalComponentTitleFilter } from '../../additional-component-title/models';
import { FixedShopAmountService } from '../services/fixed-shop-amount.service';

@Component({
  selector: 'app-fixed-shop-amount-list',
  templateUrl: './fixed-shop-amount-list.component.html',
  styleUrls: ['./fixed-shop-amount-list.component.scss'],
})
export class FixedShopAmountListComponent
  extends ListComponent<any, AdditionalComponentTitleFilter>
  implements OnInit
{
  constructor(
    private fixedShopAmountService: FixedShopAmountService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) {
    super(fixedShopAmountService, notifier, spinner, translate, route, router);
    this.titles = [
      'field.createAt',
      'field.fixedAmount',
      'field.fromOrderAmount',
      'field.toOrderAmount',
      ];
    this.properties = [
      'createAt',
      'fixedAmount',
      'fromOrderAmount',
      'toOrderAmount',
    ];
  }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.spinner.show();
    this.fixedShopAmountService
      .get(+this.route.snapshot.queryParams.shopId)
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

  navigateToCreate() {
    return  this.router.navigateByUrl(
        `/fixed-shop-amount/${+this.route.snapshot.queryParams.shopId}/create`
      );
  }

  navigateToEdit(event) {
    this.router.navigateByUrl(`/fixed-shop-amount/${+this.route.snapshot.queryParams.shopId}/edit/${event.id}`);
  }
  navigateToView(event) {
    this.router.navigateByUrl(`/fixed-shop-amount/${+this.route.snapshot.queryParams.shopId}/view/${event.id}`);
  }


  deleteItem(item) {
    this.spinner.show();
    this.fixedShopAmountService.delete(item.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.getList();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
