import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { IdentityService } from 'src/app/pages/identity/services/identity.service';
import { VendorService } from 'src/app/pages/vendor/services/vendor.service';
import {
  Pagination,
  FormMode,
  List,
  Dropdown,
  TaskService,
} from 'src/app/shared';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { isShop, isVender } from 'src/app/util/access-storge';
import { OrderReport, OrderReportFilter } from '../../model';
import { DeliveryOrderService } from '../../services/delivery-order.service';
import { ReportsService } from '../../services/reports.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.scss'],
})
export class DeliveryOrderComponent implements OnInit, OnDestroy {
  @ViewChild('orderCard', { static: false }) orderCard;
  @ViewChild('shopCartData', { static: false }) shopCartData;
  deliveryOrderlist: OrderReport[] = [];
  titles: string[] = [
    'field.orderId',
    'shop.shop',
    'field.descriptionLocation',
    'field.CreateAtTo',
    'field.customer',
    'field.customerPhone',
    // 'field.ProviderId',
    'field.ProviderFullName',
    'product.offer',
    'cobone.status',
    'field.payTypeName',
    'field.distance',
    'field.CoboneCode',
    'field.orderAmount',
    'field.total',
  ];
  properties: string[] = [
    'id',
    'shopName',
    'shopBranchDescriptionLocationAr',
    'createAt',
    'customerName',
    'customerPhoneNumber',
    // 'providerId',
    'providerName',
    'hasOffers',
    'statusName',
    'payTypeName',
    'totalDistance',
    'coboneCode',
    'orderAmount',
    'total',
  ];
  statusList: Dropdown[] = [];
  payTypeList: Dropdown[] = [];
  vendorList: Dropdown[] = [];
  isVender: boolean = false;
  orderCardDetails: any = {};

  currentLanguage: string = '';
  isShop: boolean = false;

  filter: OrderReportFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  activeTab: string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  timeLeft: number = 60;
  interval;

  constructor(
    private reportServices: ReportsService,
    private router: Router,
    private swalService: SwalModalService,
    private orderStatusService: OrderStatusService,
    private translate: TranslateService,
    private identityService: IdentityService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private vendorService: VendorService,
    private modalService: NgbModal,
    private deliveryOrderService: DeliveryOrderService,
    private activatedRoute: ActivatedRoute,
    private notifier: NotifierService,
    private headerService: HeaderService,
    private taskService: TaskService
  ) {}
  ngOnDestroy(): void {
    window.clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.DeliveryOrderDataReport')
    );
    this.isVender = isVender();
    this.filter = new OrderReportFilter();
    if (isVender()) {
      delete this.filter.CustomerId;
      delete this.filter.ShopId;
      delete this.filter.CustomerPhone;
    }
    this.isShop = isShop();
    if (isShop()) {
      this.titles = [
        'id',
        'field.Date',
        'field.COBONE_VALUE',
        'field.orderAmount',
        'field.payTypeName',
        'field.shopBranchDescriptionLocation',
        'field.shopBranchDescriptionLocationAr',
        'field.statusName',
        'field.total',
      ];
      this.properties = [
        'id',
        'createAt',
        'coboneAmount',
        'orderAmount',
        'payTypeName',
        'shopBranchDescriptionLocation',
        'shopBranchDescriptionLocationAr',
        'statusName',
        'total',
      ];
      delete this.filter.ProviderId;
      delete this.filter.CustomerId;
      delete this.filter.CustomerPhone;
      // delete this.filter.PayTypeId;
    }
    this.currentLanguage = this.translate.currentLang;
    this.filter.PageNumber = 1;
    this.filter.PageSize = 50;
    if (this.activatedRoute.snapshot.queryParams.providerId) {
      this.filter.ProviderId =
        this.activatedRoute.snapshot.queryParams.providerId;
    }
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    this.filter.StartDate = today;
    this.DeliveryOrderDataReport();
    this.getStatusDropdown();
    this.GetPaymentTypesDDL();
    this.getVendorDropdown();

    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.DeliveryOrderDataReport();
      }
    }, 1000);
  }

  getStatusDropdown(): void {
    this.orderStatusService.DeliveryOrderStatusDDL().subscribe(
      (res) => {
        this.statusList = res;
      },
      (err) => {}
    );
  }

  getVendorDropdown(): void {
    this.vendorService.getDropdown().subscribe(
      (res) => {
        this.vendorList = res;
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
    this.DeliveryOrderDataReport();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new OrderReportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.DeliveryOrderDataReport();
  }

  DeliveryOrderDataReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportServices.DeliveryOrderDataReport(this.filter).subscribe(
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
    this.DeliveryOrderDataReport();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.DeliveryOrderDataReport();
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
  navigateTO(order: { event: OrderReport; type: string }) {
    switch (order.type) {
      case 'assignProvider':
        this.router.navigateByUrl(
          `providers/near-delivery-provider/${order.event.id}?shopBranchLatitude=${order.event.shopBranchLatitude}&shopBranchLongitude=${order.event.shopBranchLongitude}`
        );
        break;
      case 'openOrderCardModal':
        this.spinner.show();
        this.deliveryOrderService.getOrderCart(order.event.id).subscribe(
          (res) => {
            this.spinner.hide();
            this.orderCardDetails = res;
            this.modalService.open(this.orderCard, {
              windowClass: 'mymodal',
              size: 'xl',
            });
            // 'backdrop': 'static'
          },
          (err) => {
            this.spinner.hide();
          }
        );
        // this.currentShopId = shop.event.id;
        break;
      case 'shopCartData':
        this.spinner.show();
        console.log(
          '🚀 ~ file: delivery-order.component.ts:297 ~ DeliveryOrderComponent ~ navigateTO ~ order:',
          order
        );
        this.deliveryOrderService.getOrderCart(order.event.id).subscribe(
          (res) => {
            this.spinner.hide();
            this.orderCardDetails = res;
            this.modalService.open(this.shopCartData, {
              windowClass: 'mymodal',
              size: 'xl',
            });
            // 'backdrop': 'static'
          },
          (err) => {
            this.spinner.hide();
          }
        );
        // this.currentShopId = shop.event.id;
        break;
      case 'acceptOrder':
        this.acceptOrder(order.event.id);
        break;
      case 'rejectOrder':
        this.rejectOrder(order.event.id);
        break;
      case 'SendOrderToTookan':
        this.sendOrderToTookan(order.event.id);
        break;
      case 'sendOrederToLive':
        this.sendOrderToLyve(order.event.id);
        break;

      default:
        break;
    }
  }

  sendOrderToLyve(id: number) {
    this.spinner.show();
    this.deliveryOrderService.sendOrderToLyve(id).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.errorMessage) {
          this.notifier.notify('error', res.errorMessage);
        }
        if (res.isSucceeded) {
          this.notifier.notify('success', res.returnData);
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.reportServices.DeliveryOrderDataReport(downloadFilter).subscribe(
      (res: List<OrderReport>) => {
        this.spinner.hide();
        let data = res.data.map((item: any) => {
          if (item.statusId != 8 && item.statusId != 11) {
            item.deliveryVat = 0;
            item.deliveryAmount = 0;
          }
          return item;
        });
        this.excelService.exportAsExcelFile(data, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  sendOrderToTookan(id: any): void {
    this.swalService.Confirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.taskService.SendOrderToTookan(id).subscribe(
          (res) => {
            this.spinner.hide();
            this.notifier.notify(
              'success',
              this.translate.instant(res.message ? res.message : 'action.done')
            );
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
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
            this.spinner.hide();
          }
        );
      }
    });
  }
}
