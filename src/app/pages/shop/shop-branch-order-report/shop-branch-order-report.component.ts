import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { TaxsReport } from '../../reports/model';
import { ShopBranchOrderReportFilter } from '../models';
import { ShopService } from '../services';

@Component({
  selector: 'app-shop-branch-order-report',
  templateUrl: './shop-branch-order-report.component.html',
  styleUrls: ['./shop-branch-order-report.component.scss'],
})
export class ShopBranchOrderReportComponent implements OnInit {
  titles: string[] = ['field.total', 'field.orderState'];
  properties: string[] = ['orderCount', 'orderStatusName'];
  busyLoading: boolean = true;
  filter: ShopBranchOrderReportFilter = new ShopBranchOrderReportFilter();
  getShopBranchsOrderList: any[] = [];
  pagination: Pagination = new Pagination();

  constructor(
    private shopService: ShopService,
    private spinner: NgxSpinnerService,
    public activatedRoute: ActivatedRoute,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.shopId) {
      this.filter.ShopId = this.activatedRoute.snapshot.queryParams.shopId;
    }
    if (this.activatedRoute.snapshot.queryParams.shopBranch) {
      this.filter.ShopBranchId =
        this.activatedRoute.snapshot.queryParams.shopBranch;
    }
    // this.filter.PageNumber = 1;
    // this.filter.PageSize = 10;
    this.getShopBranchsOrderReport();
  }

  searchValue(): void {
    this.getShopBranchsOrderReport();
  }
  resetfilter() {
    this.filter = new ShopBranchOrderReportFilter();
    this.getShopBranchsOrderReport();
  }

  getShopBranchsOrderReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.shopService.getShopBranchsOrderReport(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        if (res.length) {
          this.getShopBranchsOrderList = res[0].orderStatusReport.map(
            ({ orderCount, orderStatusName }) => {
              return { name: orderStatusName, count: orderCount };
            }
          );
        }
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.busyLoading = false;
      }
    );
  }
}
