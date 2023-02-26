import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List, Dropdown } from 'src/app/shared';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { IdentityService } from '../../identity/services/identity.service';
import { OrderReport, OrderReportFilter } from '../../reports/model';
import { ReportsService } from '../../reports/services/reports.service';

@Component({
  selector: 'app-provider-orders',
  templateUrl: './provider-orders.component.html',
  styleUrls: ['./provider-orders.component.scss']
})
export class ProviderOrdersComponent implements OnInit {
  deliveryOrderlist: OrderReport[] = [];
  titles: string[] = [
    'field.orderId',
    'shop.shop',
    'field.CreateAtTo',
    'field.customer',
    'field.ProviderId',
    'field.ProviderFullName',
    'product.offer',
    'cobone.status',
    'field.payTypeName',
  ];
  properties: string[] = [
    'id',
    'shopName',
    'createAt',
    'customerName',
    'providerId',
    'providerName',
    'hasOffers',
    'statusName',
    'payTypeName',
  ];
  statusList: Dropdown[] = [];
  payTypeList: Dropdown[] = [];

  currentLanguage: string = '';

  filter: OrderReportFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  activeTab: string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private reportServices: ReportsService,
    private router: Router,
    private swalService: SwalModalService,
    private orderStatusService: OrderStatusService,
    private translate: TranslateService,
    private identityService: IdentityService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
    this.filter = new OrderReportFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 50;
    this.transportFilter = new OrderReportFilter();
    this.transportFilter.PageNumber = 1;
    this.transportFilter.PageSize = 50;
    this.DeliveryOrderDataReport(this.filter);
    this.getStatusDropdown();
    this.GetPaymentTypesDDL();
    this.getTransportOrderDataReport(this.transportFilter);
    this.getTransportOrderStatusDDL();
  }

  getStatusDropdown(): void {
    this.orderStatusService.DeliveryOrderStatusDDL().subscribe(
      (res: any) => {
        this.statusList = res;
      },
      (err) => {}
    );
  }

  GetPaymentTypesDDL(): void {
    this.identityService.GetPaymentTypesDDL().subscribe(
      (res: any) => {
        this.payTypeList = res.returnData;
      },
      (err) => {}
    );
  }

  searchValue(): void {
    this.DeliveryOrderDataReport(this.filter);
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new OrderReportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.DeliveryOrderDataReport(this.filter);
  }

  DeliveryOrderDataReport(filter: OrderReportFilter) {
    this.busyLoading = true;
    this.filter.ProviderId = this.route.snapshot.params.id;
    this.spinner.show();
    this.reportServices.DeliveryOrderDataReport(filter).subscribe(
      (res: List<OrderReport>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.deliveryOrderlist = res.data.map((item: any) => {
          if (item.hasOffers) {
            item.hasOffers = this.translate.instant('action.yes');
          } else {
            item.hasOffers = this.translate.instant('action.no');
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
    this.DeliveryOrderDataReport(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.DeliveryOrderDataReport(this.filter);
  }
  navigateToEdit(orderReport: OrderReport) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        [`/report/delivery-order/edit/${orderReport.id}`],
        { queryParams: { statusId: orderReport.statusId } }
      )
    );
    window.open(url, '_blank');
  }

  navigateToView(orderReport: OrderReport) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([
        `/report/delivery-order/details/${orderReport.id}`,
      ])
    );
    window.open(url, '_blank');
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    downloadFilter.ProviderId = this.route.snapshot.params.id;
    this.spinner.show();
    this.reportServices.DeliveryOrderDataReport(downloadFilter).subscribe(
      (res: List<OrderReport>) => {
        this.spinner.hide();
        this.excelService.exportAsExcelFile(res.data, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  transportOrderList: OrderReport[] = [];
  TransportTitles: string[] = [
    'field.bookingId',
    'field.bookingDate',
    'field.CreateAtTo',
    'field.customer',
    'field.ProviderId',
    'field.ProviderFullName',
    'product.offer',
    'cobone.status',
    'field.payTypeName',
    'field.orderType',
  ];
  TransportProperties: string[] = [
    'id',
    'bookingDate',
    'createAt',
    'customerName',
    'providerId',
    'providerName',
    'hasOffers',
    'statusName',
    'payTypeName',
    'typeName',
  ];
  transportStatusList: Dropdown[] = [];
  transportPayTypeList: Dropdown[] = [];

  transportFilter: OrderReportFilter;
  transportPagination: Pagination = new Pagination();
  transportActiveTab: string = 'created';



  getTransportOrderStatusDDL(): void {
    this.orderStatusService.TransportOrderStatusDDL().subscribe(
      (res) => {
        this.transportStatusList = res;
      },
      (err) => {}
    );
  }

  transportSearchValue(): void {
    this.getTransportOrderDataReport(this.transportFilter);
  }

  transportResetFilter() {
    let pagePagination = {
      PageNumber: this.transportFilter.PageNumber,
      PageSize: this.transportFilter.PageSize,
    };
    this.transportFilter = new OrderReportFilter();
    this.transportFilter.PageNumber = pagePagination.PageNumber;
    this.transportFilter.PageSize = pagePagination.PageSize;
    this.getTransportOrderDataReport(this.transportFilter);
  }

  getTransportOrderDataReport(transportFilter: OrderReportFilter) {
    this.busyLoading = true;
    this.spinner.show();
    transportFilter.ProviderId = this.route.snapshot.params.id;
    this.reportServices.TransportOrderDataReport(transportFilter).subscribe(
      (res: List<OrderReport>) => {
        this.busyLoading = false;
        this.spinner.hide();
        this.transportOrderList = res.data.map((item: any) => {
          if (item.hasOffers) {
            item.hasOffers = this.translate.instant('action.yes');
          } else {
            item.hasOffers = this.translate.instant('action.no');
          }
          return item;
        });
        delete res.data;
        this.transportPagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }
  transportSetPageSize(pageSize) {
    if (pageSize == this.transportFilter.PageSize) return;
    this.transportFilter.PageSize = pageSize;
    this.getTransportOrderDataReport(this.transportFilter);
  }

  transportsSetPageNumber(pageNumber: number) {
    if (pageNumber == this.transportFilter.PageNumber) return;
    this.transportFilter.PageNumber = pageNumber;
    this.getTransportOrderDataReport(this.transportFilter);
  }

  transportNavigateToEdit(orderReport: OrderReport) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        [`/report/transport-order/edit/${orderReport.id}`],
        { queryParams: { statusId: orderReport.statusId } }
      )
    );
    window.open(url, '_blank');
  }
  transportNavigateToView(orderReport: OrderReport) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([
        `/report/transport-order/details/${orderReport.id}`,
      ])
    );
    window.open(url, '_blank');
  }

  transportDownloadAll() {
    let downloadtransportFilter: OrderReportFilter = this.transportFilter;
    downloadtransportFilter.PageNumber = 1;
    downloadtransportFilter.ProviderId = this.route.snapshot.params.id;
    downloadtransportFilter.PageSize = this.transportPagination.totalItemCount;
    this.reportServices
      .TransportOrderDataReport(downloadtransportFilter)
      .subscribe(
        (res: List<OrderReport>) => {
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
