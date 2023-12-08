import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { DeliveryOrderFilter, OrderReport } from '../../model';
import { DeliveryOrderService } from '../../services/delivery-order.service';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-delivery-order-status',
  templateUrl: './delivery-order-status.component.html',
  styleUrls: ['./delivery-order-status.component.scss'],
})
export class DeliveryOrderStatusComponent implements OnInit {
  titles: string[] = [
    'field.Date',
    'field.statusName',
    'field.payTypeName',
    'field.customerName',
    'field.ProviderName',
    'field.ShopName',
    'field.ShopNameAr',
    'field.coponeDiscount',
    'shopBrancheDescriptionLocation',
  ];
  properties: string[] = [
    'createAt',
    'statusName',
    'payTypeName',
    'customerName',
    'providerName',
    'shopName',
    'shopNameAr',
    'coponeDiscount',
    'shopBrancheDescriptionLocation',
  ];
  busyLoading: boolean = true;
  filter: DeliveryOrderFilter = new DeliveryOrderFilter();
  list: any[] = [];
  pagination: Pagination = new Pagination();

  timeLeft: number = 60;
  interval;

  constructor(
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private swalService: SwalModalService,
    private deliveryOrderService: DeliveryOrderService,
    private translate: TranslateService,
    private notifier: NotifierService,
    private router: Router,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getDeliveryOrdersReport();
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.getDeliveryOrdersReport();
      }
    }, 1000);
  }

  searchValue(): void {
    this.getDeliveryOrdersReport();
  }
  resetfilter() {
    this.filter = new DeliveryOrderFilter();
    this.getDeliveryOrdersReport();
  }

  getDeliveryOrdersReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportsService.DeliveryOrdersReport(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.list = res.data;
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
    this.getDeliveryOrdersReport();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getDeliveryOrdersReport();
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
  navigateToOrderDetails(event: OrderReport) {
    const viewOrder = this.router.serializeUrl(
      this.router.createUrlTree([`report/delivery-order/edit/${event.id}`])
    );
    window.open(viewOrder, '_blank');
  }
  navigateTO(order: { event: OrderReport; type: string }) {
    switch (order.type) {
      case 'acceptOrder':
        this.acceptOrder(order.event.id);
        break;
      case 'rejectOrder':
        this.rejectOrder(order.event.id);
        break;

      default:
        break;
    }
  }

  acceptOrder(id: any): void {
    this.swalService.Confirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.deliveryOrderService.acceptOrder(id).subscribe(
          (res) => {
            this.spinner.hide();
            this.notifier.notify(
              'success',
              this.translate.instant('action.done')
            );
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }

  rejectOrder(id: any): void {
    this.swalService.Confirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.deliveryOrderService.rejectOrder(id).subscribe(
          (res) => {
            this.spinner.hide();
            this.notifier.notify(
              'success',
              this.translate.instant('action.done')
            );
          },
          (err) => {
            console.log(
              '🚀 ~ file: delivery-order-status.component.ts:158 ~ DeliveryOrderStatusComponent ~ this.swalService.Confirmation ~ err',
              err
            );
            this.spinner.hide();
          }
        );
      }
    });
  }
}
