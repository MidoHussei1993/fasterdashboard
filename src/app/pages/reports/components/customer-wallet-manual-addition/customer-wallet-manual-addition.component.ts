import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { CustomerWalletManualAdditionReport, TaxsReport } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-customer-wallet-manual-addition',
  templateUrl: './customer-wallet-manual-addition.component.html',
  styleUrls: ['./customer-wallet-manual-addition.component.scss'],
})
export class CustomerWalletManualAdditionComponent implements OnInit {
  titles: string[] = [
    'field.Date',
    'forgetPassword.userName',
    'field.deliveryOrderId',
    'field.TransportOrderId',
    'field.customerId',
    'field.customerName',
    'field.customerPhone',
    'provider.operation_amount',
    'provider.operation',
    'field.note',
  ];
  properties: string[] = [
    'createAt',
    'userName',
    'deliveryOrderId',
    'transportOrderId',
    'customerId',
    'customerName',
    'customerPhone',
    'amount',
    'type',
    'note',
  ];
  busyLoading: boolean = true;
  filter: CustomerWalletManualAdditionReport =
    new CustomerWalletManualAdditionReport();
  reportList: any[] = [];
  pagination: Pagination = new Pagination();

  constructor(
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private router: Router,
    private notifier: NotifierService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCustomerWalletManualAdditionReport();
  }

  searchValue(): void {
    this.getCustomerWalletManualAdditionReport();
  }
  resetfilter() {
    this.filter = new CustomerWalletManualAdditionReport();
    this.getCustomerWalletManualAdditionReport();
  }

  getCustomerWalletManualAdditionReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportsService
      .CustomerWalletManualAdditionReport(this.filter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.reportList = res.data.map((item) => {
            if (item.type == 1) {
              item.type = this.translate.instant('action.deduct');
            } else if (item.type == 2) {
              item.type = this.translate.instant('action.deposit');
            }
            return item;
          });
          delete res.data;
          this.pagination = { ...res };
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
          this.busyLoading = false;
        }
      );
  }
  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCustomerWalletManualAdditionReport();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCustomerWalletManualAdditionReport();
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.reportsService
      .CustomerWalletManualAdditionReport(downloadFilter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.excelService.exportAsExcelFile(res.data, 'data_file');
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
        }
      );
  }
  navigateToOrder(item: any) {
    if (item.deliveryOrderId) {
      const deliveryOrderPage = this.router.serializeUrl(
        this.router.createUrlTree([
          `report/delivery-order/edit/${item.deliveryOrderId}`,
        ])
      );
      window.open(deliveryOrderPage, '_blank');
    } else if (item.transportOrderId) {
      const transportOrderPage = this.router.serializeUrl(
        this.router.createUrlTree([
          `report/transport-order/details/${item.transportOrderId}`,
        ])
      );
      window.open(transportOrderPage, '_blank');
    } else {
      return this.notifier.notify('error', 'no order');
    }
  }
}
