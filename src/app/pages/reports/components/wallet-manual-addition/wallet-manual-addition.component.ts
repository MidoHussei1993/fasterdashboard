import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { ProviderWalletManualAdditionReport, TaxsReport } from '../../model';
import { ReportsService } from '../../services/reports.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-wallet-manual-addition',
  templateUrl: './wallet-manual-addition.component.html',
  styleUrls: ['./wallet-manual-addition.component.scss'],
})
export class WalletManualAdditionComponent implements OnInit {
  titles: string[] = [
    'field.Date',
    'forgetPassword.userName',
    'field.deliveryOrderId',
    'field.TransportOrderId',
    'field.ProviderId',
    'field.ProviderFullName',
    'field.ProviderPhone',
    'provider.operation',
    'provider.operation_amount',
    'field.note',
  ];
  properties: string[] = [
    'createAt',
    'userName',
    'deliveryOrderId',
    'transportOrderId',
    'providerId',
    'providerName',
    'providerPhone',
    'type',
    'amount',
    'note',
  ];
  busyLoading: boolean = true;
  filter: ProviderWalletManualAdditionReport =
    new ProviderWalletManualAdditionReport();
  ReportList: any[] = [];
  pagination: Pagination = new Pagination();

  constructor(
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private router: Router,
    private notifier: NotifierService,
    private headerService: HeaderService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.walletManualAddition')
    );
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getProviderWalletManualAdditionReport();
  }

  searchValue(): void {
    this.getProviderWalletManualAdditionReport();
  }
  resetfilter() {
    this.filter = new ProviderWalletManualAdditionReport();
    this.getProviderWalletManualAdditionReport();
  }

  getProviderWalletManualAdditionReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportsService
      .ProviderWalletManualAdditionReport(this.filter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.ReportList = res.data.map((item) => {
            // if (item.type == 1) {
            //   item.type = this.translate.instant('action.deduct');
            // } else if (item.type == 2) {
            //   item.type = this.translate.instant('action.deposit');
            // }
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
    this.getProviderWalletManualAdditionReport();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getProviderWalletManualAdditionReport();
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.reportsService
      .ProviderWalletManualAdditionReport(downloadFilter)
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
