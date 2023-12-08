import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared';
import { FormMode } from 'src/app/shared/constant/form-modes';
import { Pagination } from 'src/app/shared/models/pagination';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { CoboneReport } from '../../model/cobone-report.model';
import { CoboneTransportFilter } from '../../model/cobone-transport-filter.model';
import { CoboneFilter } from '../../model/cobonefilter.model';
import { CoboneTrasport } from '../../model/cobonetrasport.model';
import { OrderFilter } from '../../model/deliverOrderStatusFilter.model';
import { DeliveryOrderStatus } from '../../model/deliveryOrder-status.model';
import { ShopFilter } from '../../model/shop-filter.model';
import { ShopResturant } from '../../model/shop.model';
import { ReportsService } from '../../services/reports.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop-orders-count-report',
  templateUrl: './shop-orders-count-report.component.html',
  styleUrls: ['./shop-orders-count-report.component.scss'],
})
export class ShopOrdersCountReportComponent implements OnInit {
  CoboneReport: ShopResturant[] = [];
  titles: string[] = [
    'Shop',
    'accepted Count',
    'accepted Offer Price Count',
    'canceled From Admin Count',
    'canceled From Customer Count',
    'canceled From Provider Count',
    'canceled FromShopCount',
    'created Count',
    'customer Finished Count',
    'inKitchen Count',
    'provider Finished Count',
    'reached Customer Count',
    'rejected From ShopCount',
  ];
  properties: string[] = [
    'shopName',
    'acceptedCount',
    'acceptedOfferPriceCount',
    'canceledFromAdminCount',
    'canceledFromCustomerCount',
    'canceledFromProviderCount',
    'canceledFromShopCount',
    'createdCount',
    'customerFinishedCount',
    'inKitchenCount',
    'providerFinishedCount',
    'reachedCustomerCount',
    'rejectedFromShopCount',
  ];
  filter: ShopFilter;
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
    private translate: TranslateService,
    private headerService: HeaderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('reports.ShopAndResturant')
    );
    this.filter = new ShopFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getcobonetransport(this.filter);
  }

  getcobonetransport(filter: ShopFilter) {
    this.busyLoading = true;
    let id = this.route.snapshot.params.id;
    this.reportServices.ShopAndResturant(filter).subscribe(
      (res: List<ShopResturant>) => {
        this.busyLoading = false;
        this.CoboneReport = res.data;
        delete res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.busyLoading = false;
      }
    );
  }
  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getcobonetransport(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getcobonetransport(this.filter);
  }

  navigate(conboneObj: CoboneReport, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`cobone-report/delivery/${conboneObj.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`cobone-report/details/${conboneObj.id}`]);
        break;

      default:
        break;
    }
  }
}
