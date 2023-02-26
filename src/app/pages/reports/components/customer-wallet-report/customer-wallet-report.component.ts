import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { CustomerWalletReportFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-customer-wallet-report',
  templateUrl: './customer-wallet-report.component.html',
  styleUrls: ['./customer-wallet-report.component.scss']
})
export class CustomerWalletReportComponent implements OnInit {
  walletReportList: any[] = [];
  finalTotalMinutes:number = null;
  filter: CustomerWalletReportFilter;
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
    private excelService:ExcelService,
    private translate: TranslateService,

    ) {}

  ngOnInit(): void {
    this.filter = new CustomerWalletReportFilter();
    this.walletReportList = [];
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCustomerWalletReport();
  }

  searchValue(): void {
    this.getCustomerWalletReport();
  }
  resetSearch(): void {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CustomerWalletReportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getCustomerWalletReport();
  }

  getCustomerWalletReport() {
    this.walletReportList = [];
    this.busyLoading = true;
    this.spinner.show();
    this.reportsService.CustomerWalletReport(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.walletReportList = res.data;
        delete res.data;
        this.pagination = { ...res};
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
    this.getCustomerWalletReport();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.active = pageNumber;
    this.filter.PageNumber = pageNumber;
    this.getCustomerWalletReport();
  }
  downloadAll(){
    let downloadFilter : any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.reportsService.CustomerWalletReport(downloadFilter).subscribe(
      (res: any) => {
        this.spinner.hide();
        let arr2 = []
        let arr = res.data.map(item =>{
          item.walletTransactions.map(transaction =>{
            arr2.push({
              customerId: item.customerId,
              customerName: item.customerName,
              customerPhone:item.customerPhone,
              walletSum:item.walletSum,
              ...transaction,
              type:this.translate.instant(transaction.type == 1?"action.Withdrawal":"action.deposit")
            })

          })
        })
        console.log(arr2);
        this.excelService.exportAsExcelFile(arr2, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    )
  }

}
