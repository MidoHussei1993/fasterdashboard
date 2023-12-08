import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Filter, List, Pagination } from 'src/app/shared';
import { ProviderList, ProviderFilter } from '../provider/models';
import { ProviderService } from '../provider/services';
import { ProviderCount } from '../reports/model';
import { OrderFilter } from '../reports/model/deliverOrderStatusFilter.model';
import { DeliveryOrderStatus } from '../reports/model/deliveryOrder-status.model';
import { ReportsService } from '../reports/services/reports.service';
import { SettingService } from '../setting/services/setting.service';
import { ShopService } from '../shop/services';
import { HeaderService } from 'src/app/core/services/header.service';
import { isShop } from 'src/app/util/access-storge';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  report: any = {};
  DeliveryOrderStatus = [];
  TransportOrderStatus = [];
  dispatchTypeList = [];
  activeProvidersreport: { name: string; count: number }[] = [];
  currentLanguage: string = '';
  dispatchTypeId: number = null;
  isShop: boolean = false;
  filter: ProviderFilter = new ProviderFilter();
  driverType: string = '';
  isAdmin: boolean = false;
  seliveryOrderStatistics: any = {};

  constructor(
    private reportsService: ReportsService,
    private translate: TranslateService,
    private providerService: ProviderService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settingService: SettingService,
    private shopService: ShopService,
    private headerService: HeaderService,
    private notifier: NotifierService
  ) {
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit() {
    this.isShop = isShop();
    this.headerService.setPageTitle(this.translate.instant('faster'));
    let u1 = new SpeechSynthesisUtterance('Hi');
    u1.lang = 'en-US';
    speechSynthesis.speak(u1);
    setTimeout(() => {
      let u1 = new SpeechSynthesisUtterance('welcome to faster');
      u1.lang = 'en-US';
      speechSynthesis.speak(u1);
    }, 2000);
    let roles: any[] = JSON.parse(localStorage.getItem('roles'));
    this.isAdmin = roles.includes('administrator');
    // this.filter.Registertype
    if (this.activatedRoute.snapshot.queryParamMap.get('shopId')) {
      this.getProviderCountsReport(
        this.activatedRoute.snapshot.queryParamMap.get('shopId')
      );
    } else {
      if (JSON.parse(localStorage.getItem('roles'))) {
        this.DeliveryOrderStatusReport();
        if (
          (JSON.parse(localStorage.getItem('roles')) as Array<any>).includes(
            'administrator'
          )
        ) {
          this.TransportOrderStatusReport();
          this.getProviderCountsReport();
          this.getProviderCountsReportChart();
        }
        if (
          (JSON.parse(localStorage.getItem('roles')) as Array<any>).includes(
            'vendor'
          )
        ) {
          this.TransportOrderStatusReport();
        }
      }
    }
    this.getDispatchTypeDropDown();
    this.getDeliveryOrderStatistics();
  }
  getDeliveryOrderStatistics() {
    this.reportsService.DeliveryOrderStatistics().subscribe(
      (res) => {
        this.seliveryOrderStatistics = res;
        console.log(
          '🚀 ~ file: dashboard.component.ts:93 ~ DashboardComponent ~ getDeliveryOrderStatistics ~ this.seliveryOrderStatistics:',
          this.seliveryOrderStatistics
        );
      },
      (err) => {}
    );
  }

  getDispatchTypeDropDown() {
    this.spinner.show();
    this.shopService.GetDispatchTypeDDL().subscribe(
      (res) => {
        console.log(res);
        this.dispatchTypeList = res;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  changeDispatchType() {
    this.spinner.show();
    if (!this.dispatchTypeId) return;
    this.shopService.ChangeDispatchType(this.dispatchTypeId).subscribe(
      (res) => {
        this.spinner.hide();
        console.log(
          '🚀 ~ file: dashboard.component.ts:106 ~ DashboardComponent ~ changeDispatchType ~ res:',
          res
        );
        this.notifier.notify('success', this.translate.instant('action.done'));
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  backupDataBase() {
    this.spinner.show();
    this.settingService.BackupDB().subscribe(
      (result: any) => {
        this.spinner.hide();
        console.log(result);
        this.notifier.notify('success', result);
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        this.notifier.notify('error', this.translate.instant('action.wrong'));
      }
    );
  }

  getProviderCountsReportChart() {
    this.reportsService.getProviderCountsReport().subscribe(
      (res: ProviderCount) => {
        this.activeProvidersreport = [
          {
            name: this.translate.instant('report.activeProviders'),
            count: res.activeProviders,
          },
          {
            name: this.translate.instant('report.notActiveProviders'),
            count: res.notActiveProviders,
          },
          {
            name: this.translate.instant('report.providersHaveOneOrderAtLeast'),
            count: res.providersHaveOneOrderAtLeast,
          },
        ];
      },
      (err) => {}
    );
  }

  navigateToProviderWalletList(provider: ProviderList) {
    this.router.navigate([`provider-wallet/${provider.id}/create`]);
  }

  gotoLocation(provider: ProviderList) {
    this.router.navigate([`provider-tricking/${provider.applicationUserId}`]);
  }
  getProviderCountsReport(VendorId = null) {
    this.reportsService.getProviderCountsReport(VendorId).subscribe(
      (res: any) => {
        this.report = res;
      },
      (err) => {}
    );
  }

  navigateToProviderListWithQuery() {
    this.router.navigateByUrl(`/providers?driverType=${this.driverType}`);
  }

  DeliveryOrderStatusReport() {
    let filter = new OrderFilter();
    filter.PageNumber = 1;
    filter.PageSize = 100;
    this.reportsService.DeliveryOrderStatusReport(filter).subscribe(
      (res: List<DeliveryOrderStatus>) => {
        this.DeliveryOrderStatus = res.data;
        console.log(res);
      },
      (err) => {}
    );
  }

  TransportOrderStatusReport() {
    let filter = new OrderFilter();
    filter.PageNumber = 1;
    filter.PageSize = 100;
    this.reportsService.TransportOrderStatusReport(filter).subscribe(
      (res: List<DeliveryOrderStatus>) => {
        this.TransportOrderStatus = res.data;
        console.log(res);
      },
      (err) => {}
    );
  }
  navigateToProviderList() {
    localStorage.setItem('providerFilter', JSON.stringify(this.filter));
    this.router.navigateByUrl('/identity/providers');
  }
}
