import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { ProviderWalletReportFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-provider-wallet-report',
  templateUrl: './provider-wallet-report.component.html',
  styleUrls: ['./provider-wallet-report.component.scss'],
})
export class ProviderWalletReportComponent implements OnInit {
  walletReportList: any[] = [];
  finalTotalMinutes: number = null;
  filter: ProviderWalletReportFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  active: number = 1;
  public get formMode(): typeof FormMode {
    return FormMode;
  }

  constructor(
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private headerService: HeaderService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.providerWalletReport')
    );
    this.filter = new ProviderWalletReportFilter();
    this.walletReportList = [];
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getProviderWalletReport();
  }

  searchValue(): void {
    this.getProviderWalletReport();
  }
  resetSearch(): void {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ProviderWalletReportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getProviderWalletReport();
  }

  getProviderWalletReport() {
    this.walletReportList = [];
    this.busyLoading = true;
    this.spinner.show();
    this.reportsService.ProviderWalletReport(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.walletReportList = res.data;
        delete res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  setPageSize(event) {
    let pageSize = Number(+event.split(': ')[1]);
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getProviderWalletReport();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.active = pageNumber;
    this.filter.PageNumber = pageNumber;
    this.getProviderWalletReport();
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.reportsService.ProviderWalletReport(downloadFilter).subscribe(
      (res: any) => {
        this.spinner.hide();
        let arr2 = [];
        let arr = res.data.map((item) => {
          item.walletTransactions.map((transaction) => {
            arr2.push({
              providerId: item.providerId,
              providerName: item.providerName,
              providerPhone: item.providerPhone,
              walletSum: item.walletSum,
              registerType: item.registerType,
              ...transaction,
              type: this.translate.instant(
                transaction.type == 1 ? 'action.Withdrawal' : 'action.deposit'
              ),
            });
          });
        });
        console.log(arr2);
        this.excelService.exportAsExcelFile(arr2, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
}
