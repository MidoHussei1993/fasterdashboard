import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerLastLoginFilter, CustomerService, Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-customer-last-login',
  templateUrl: './customer-last-login.component.html',
  styleUrls: ['./customer-last-login.component.scss']
})
export class CustomerLastLoginComponent implements OnInit {
  titles: string[] = [
    'field.customerId',
    'field.lastLogin',
    'field.FullName',
    'field.phoneNumber',
  ];
  properties: string[] = [
    'customersId',
    'lastLogin',
    'fullName',
    'phoneNumber',
  ];
  reportList:any[] = [];
  busyLoading: boolean = true;
  filter: CustomerLastLoginFilter = new CustomerLastLoginFilter();
  pagination: Pagination = new Pagination();

  constructor(
    private customerService: CustomerService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 80;
    this.getLastLoginReport();
  }

  searchValue(): void {
    this.getLastLoginReport();
  }
  resetfilter() {
    this.filter = new CustomerLastLoginFilter();
    this.getLastLoginReport();
  }

  getLastLoginReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.customerService.getLastLoginReport(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.reportList = res.data;
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
    this.getLastLoginReport();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getLastLoginReport();
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.customerService.getLastLoginReport(downloadFilter).subscribe(
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
}
