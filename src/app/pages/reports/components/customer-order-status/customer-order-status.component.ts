import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, Pagination } from 'src/app/shared';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { CustomerOrderStatusReportFilter } from '../../model/CustomerOrderStatusReport-filter.model';
import { CustomerOrderStatusReport } from '../../model/CustomerOrderStatusReport.model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-customer-order-status',
  templateUrl: './customer-order-status.component.html',
  styleUrls: ['./customer-order-status.component.scss'],
})
export class CustomerOrderStatusComponent implements OnInit {
  titles: string[] = [
    'field.customerId',
    'field.customerName',
    'field.customerPhone',
    'field.customerWalletSum',
    'field.deliveryOrderCount',
    'field.startUpAmount',
    'field.taxiOrderCount',
    'field.transportOrderCount',
  ];
  properties: string[] = [
    'customerId',
    'customerName',
    'customerPhone',
    'customerWalletSum',
    'deliveryOrderCount',
    'startUpAmount',
    'taxiOrderCount',
    'transportOrderCount',
  ];
  busyLoading: boolean = true;
  filter: CustomerOrderStatusReportFilter =
    new CustomerOrderStatusReportFilter();
  pagination: Pagination = new Pagination();
  customerOrderStatusReportList: CustomerOrderStatusReport[] = [];
  deliveryStatusList: Dropdown[] = [];
  traansportStatusList: Dropdown[] = [];
  currentLanguage: string = '';

  constructor(
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private orderStatusService: OrderStatusService,
    private translate: TranslateService,
    private excelService:ExcelService,
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCustomerOrderStatusReport();
    this.DeliveryOrderStatusDDL();
    this.TransportOrderStatusDDL();
  }
  DeliveryOrderStatusDDL(): void {
    this.orderStatusService.DeliveryOrderStatusDDL().subscribe(
      (res) => {
        this.deliveryStatusList = res;
      },
      (err) => {}
    );
  }

  TransportOrderStatusDDL(): void {
    this.orderStatusService.TransportOrderStatusDDL().subscribe(
      (res) => {
        this.traansportStatusList = res;
      },
      (err) => {}
    );
  }

  searchValue(): void {
    this.getCustomerOrderStatusReport();
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CustomerOrderStatusReportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getCustomerOrderStatusReport();
  }

  getCustomerOrderStatusReport() {
    if (
      (this.filter.StatusId && this.filter.TypeId) ||
      (this.filter.StatusId == null && this.filter.TypeId == null)
    ) {
      this.busyLoading = true;
      this.spinner.show();
      this.reportsService.CustomerOrderStatusReport(this.filter).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.customerOrderStatusReportList = res.data;
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
  }
  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCustomerOrderStatusReport();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCustomerOrderStatusReport();
  }
  downloadAll(){
    let downloadFilter : any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.reportsService.CustomerOrderStatusReport(downloadFilter).subscribe(
      (res:any) => {
        this.spinner.hide();
        this.excelService.exportAsExcelFile(res.data, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    )
  }
}
