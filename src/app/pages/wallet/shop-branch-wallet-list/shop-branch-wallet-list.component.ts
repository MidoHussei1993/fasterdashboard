import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { ShopBranchWalletFilter } from '../models';
import { ShopBranchWalletService } from '../services/shop-branch-wallet.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-shop-branch-wallet-list',
  templateUrl: './shop-branch-wallet-list.component.html',
  styleUrls: ['./shop-branch-wallet-list.component.scss'],
})
export class ShopBranchWalletListComponent
  extends ListComponent<any, any>
  implements OnInit
{
  total: number = null;

  filter: ShopBranchWalletFilter = new ShopBranchWalletFilter();
  constructor(
    private shopBranchWalletService: ShopBranchWalletService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private headerService: HeaderService,
    private excelService: ExcelService
  ) {
    super(shopBranchWalletService, notifier, spinner, translate, route, router);
    this.titles = [
      'id',
      'field.Date',
      'field.note',
      'provider.operation_amount',
      'field.deliveryOrderId',
    ];
    this.properties = ['id', 'createAt', 'note', 'amount', 'deliveryOrderId'];
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.Shop_Branch_Wallet')
    );
    this.navigateTo = 'faster-wallet/branch-wallet';
    if (this.route.snapshot.queryParams.shopBranchId) {
      this.filter.ShopBranchId = this.route.snapshot.queryParams.shopBranchId;
    }
    this.getList();
    this.getTotal();
  }

  getList() {
    this.spinner.show();
    this.shopBranchWalletService.get(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.list = res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  getTotal() {
    this.shopBranchWalletService
      .GetShopBranchWalletSum(this.filter.ShopBranchId)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.total = res;
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }

  resetfilter() {
    this.filter = new ShopBranchWalletFilter();
  }

  downloadAll() {
    this.excelService.exportAsExcelFile(this.list, 'data_file');
  }

  navigateTO(wallet: { event: any; type: string }) {
    switch (wallet.type) {
      case 'create':
        const product = this.router.serializeUrl(
          this.router.createUrlTree([
            `faster-wallet/branch-wallet/create/${wallet.event.id}`,
          ])
        );
        window.open(product, '_blank');
        break;
      case 'order':
        if (wallet.event.deliveryOrderId) {
          const deliveryOrderPage = this.router.serializeUrl(
            this.router.createUrlTree([
              `report/delivery-order/details/${wallet.event.deliveryOrderId}`,
            ])
          );
          window.open(deliveryOrderPage, '_blank');
        }
        break;
    }
  }
}
