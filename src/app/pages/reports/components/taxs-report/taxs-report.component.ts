import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { TaxsReport, TaxsReportFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-taxs-report',
  templateUrl: './taxs-report.component.html',
  styleUrls: ['./taxs-report.component.scss'],
})
export class TaxsReportComponent implements OnInit {
  titles: string[] = [
    'field.orderId',
    'field.CreateAtTo',
    'provider.operation_amount',
    'app.vat',
    'field.deliveryAmountWithVat',
  ];
  properties: string[] = [
    'orderId',
    'createAt',
    'deliveryAmount',
    'deliveryVat',
    'deliveryAmountWithVat',
  ];
  busyLoading: boolean = true;
  filter: TaxsReportFilter = new TaxsReportFilter();
  taxsReportList: TaxsReport[] = [];
  pagination: Pagination = new Pagination();

  constructor(
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    // this.getProductDetailsSizeList();
  }

  searchValue(): void {
    this.getProductDetailsSizeList();
  }
  resetfilter() {
    this.filter = new TaxsReportFilter();
    this.getProductDetailsSizeList();
  }

  getProductDetailsSizeList() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportsService.TaxsReport(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.taxsReportList = res.data;
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
    this.getProductDetailsSizeList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getProductDetailsSizeList();
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.reportsService.TaxsReport(downloadFilter).subscribe(
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
