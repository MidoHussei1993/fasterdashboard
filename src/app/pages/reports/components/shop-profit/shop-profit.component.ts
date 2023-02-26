import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent, Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { flattenObj } from 'src/app/util';
import { isShop } from 'src/app/util/access-storge';
import { ShopProfitReportFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-shop-profit',
  templateUrl: './shop-profit.component.html',
  styleUrls: ['./shop-profit.component.scss'],
})
export class ShopProfitComponent
  extends ListComponent<any, any>
  implements OnInit
{
  filter: ShopProfitReportFilter = new ShopProfitReportFilter();
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  active: number = 1;
  constructor(
    private reportsService: ReportsService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private excelService: ExcelService
  ) {
    super(reportsService, notifier, spinner, translate, route, router);
    this.titles = [
      'field.ShopName',
      'field.branch',
      'field.orderId',
      'field.Date',
      'field.ShopName',
      'field.ShopName',
      'field.ShopName',
      'field.ShopName',
      'field.ShopName',
      'field.ShopName',
      'field.totalOrderAmount',
      'field.totalFasterProfit',
      'field.totalShopProfit',
    ];
    this.properties = [
      'shopNameEn',
      'discriptionLocationEn',
      'orderId',
      'createAt',
      'shopNameEn',
      'shopNameEn',
      'shopNameEn',
      'shopNameEn',
      'shopNameEn',
      'shopNameEn',
      'shopNameEn',
      'totalOrderAmount',
      'totalFasterProfit',
      'totalShopProfit',
    ];
  }

  isShop: boolean = false;
  ngOnInit(): void {
    this.isShop = isShop();
    if (this.route.snapshot.queryParams.shopId)
      this.filter.ShopId = this.route.snapshot.queryParams.shopId;
    if (this.route.snapshot.queryParams.shopBranchId)
      this.filter.ShopBranchId = this.route.snapshot.queryParams.shopBranchId;
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.reportsService.getShopProfitReport(this.filter).subscribe(
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
  setPageSize(event) {
    let pageSize = Number(+event.split(': ')[1]);
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.active = pageNumber;
    this.filter.PageNumber = pageNumber;
    this.getList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ShopProfitReportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getList();
  }
  navigateToShop(shopNameEn) {
    const shop = this.router.serializeUrl(
      this.router.createUrlTree([`/shop`], {
        queryParams: {
          shopName: shopNameEn,
        },
      })
    );
    window.open(shop, '_blank');
  }
  navigateToOrder(orderId) {
    const locationUrl = this.router.serializeUrl(
      this.router.createUrlTree([`/report/delivery-order/details/${orderId}`])
    );
    window.open(locationUrl, '_blank');
  }

  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.reportsService.getShopProfitReport(downloadFilter).subscribe(
      (res) => {
        this.spinner.hide();
        let temp = [];
        let data = res.data.map((item) => {
          if (item.orders.length) {
            item.orders.map((order) => {
              if (order.walletTransactions.length) {
                order.walletTransactions.map((transaction) => {
                  temp.push({ ...item, ...order, ...transaction });
                });
              } else temp.push({ ...item, ...order });
            });
          } else temp.push(item);
        });

        this.excelService.exportAsExcelFile(temp, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
}
