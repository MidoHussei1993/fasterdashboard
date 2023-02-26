import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IdentityService } from 'src/app/pages/identity/services/identity.service';
import { Pagination, FormMode, List, Dropdown } from 'src/app/shared';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { OrderReport, OrderReportFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-transport-order',
  templateUrl: './transport-order.component.html',
  styleUrls: ['./transport-order.component.scss']
})
export class TransportOrderComponent implements OnInit {
  transportOrderList: OrderReport[] = [];
  titles: string[] = [
    'field.bookingId',
    'field.bookingDate',
    'field.CreateAtTo',
    'field.customer',
    // 'field.ProviderId',
    'field.ProviderFullName',
    'product.offer',
    'cobone.status',
    'field.payTypeName',
    'field.orderType',
     'field.orderAmount',
    // 'field.total',
  ];
  properties: string[] = [
    "id",
    "bookingDate",
    'createAt',
    "customerName",
    // "providerId",
    "providerName",
    "hasOffers",
    "statusName",
    'payTypeName',
    'typeName',
    'orderAmount',
    // 'total',
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
    private identityService: IdentityService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private excelService:ExcelService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
    this.filter = new OrderReportFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 50;
    let today = new Date();
    today.setHours(0,0,0,0); 
    this.filter.StartDate = today
    this.getTransportOrderDataReport(this.filter);
    this.getStatusDropdown();
    this.GetPaymentTypesDDL();
  }

  getStatusDropdown(): void {
    this.orderStatusService.TransportOrderStatusDDL().subscribe(
      (res) => {
        this.statusList = res;
      },
      (err) => {}
    );
  }
  GetPaymentTypesDDL(): void {
    this.identityService.GetPaymentTypesDDL().subscribe(
      (res:any) => {
        this.payTypeList = res.returnData;
      },
      (err) => {}
    );
  }
  searchValue(): void {
    this.getTransportOrderDataReport(this.filter);
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new OrderReportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getTransportOrderDataReport(this.filter);
  }

  getTransportOrderDataReport(filter: OrderReportFilter) {
    this.busyLoading = true;
    this.spinner.show();
    this.reportServices.TransportOrderDataReport(filter).subscribe((res: List<OrderReport>) => {
      this.busyLoading = false;
      this.spinner.hide();
      this.transportOrderList = res.data.map((item: any) =>{
        if (item.hasOffers) {
          item.hasOffers = this.translate.instant('action.yes')
        }else{
          item.hasOffers = this.translate.instant('action.no')
        }
        return item
      });
      delete res.data;
      this.pagination = { ...res }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.busyLoading = false;
    })
  }
  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getTransportOrderDataReport(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getTransportOrderDataReport(this.filter);
  }

  navigateToEdit(orderReport: OrderReport){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/report/transport-order/edit/${orderReport.id}`]
      , { queryParams: { statusId: orderReport.statusId} })
    );
    window.open(url, '_blank');
  }
  navigateToView(orderReport: OrderReport){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/report/transport-order/details/${orderReport.id}`])
    );
    window.open(url, '_blank');
  }

  navigateTO( order: { event: any; type: string }) {
    switch (order.type) {
      case 'assignProvider':
        this.router.navigateByUrl(`providers/near-delivery-provider/${order.event.id}?shopBranchLatitude=${order.event.orderLatitude}&shopBranchLongitude=${order.event.orderLongitude}`);
        break;

      default:
        break;
    }
  }

  downloadAll(){
    let downloadFilter : any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.reportServices.TransportOrderDataReport(downloadFilter).subscribe(
      (res: List<OrderReport>) => {
        this.spinner.hide();
        let data = res.data.map((item:any) =>{
          if(item.statusId != 10 && item.statusId != 11){
            item.orderAmount = 0
            item.orderVat = 0
          }
          return item
        })
        this.excelService.exportAsExcelFile(data, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    )
  }

}
