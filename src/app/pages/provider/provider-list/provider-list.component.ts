import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { ProviderIdentity } from '../../identity/models';
import { IdentityService } from '../../identity/services/identity.service';
import { ProviderFilter, ProviderList } from '../models';
import { ProviderService } from '../services';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss'],
})
export class ProviderListComponent implements OnInit {
  providerList: ProviderList[] = [];
  titles: string[] = [
    'global.full_name',
    'field.email',
    'global.phone_number',
    'global.type',
  ];
  properties: string[] = ['fullName', 'email', 'phoneNumber', 'gender'];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: ProviderFilter = new ProviderFilter();

  providerTypeList: any[] = [];
  busyLoadingProviderType: boolean = false;

  currentLanguage: string = '';

  driverType: string = '';
  showDownload:boolean = false;

  constructor(
    private identityService: IdentityService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,
    private providerService: ProviderService,
    private excelService: ExcelService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.driverType = this.activatedRoute.snapshot.queryParams.driverType;
    if (this.activatedRoute.snapshot.queryParams.driverType) {
      if (this.activatedRoute.snapshot.queryParams.driverType == 'providersHaveOneOrderAtLeast') {
       this.showDownload = true;
      }
   }
    if (localStorage.getItem('providerFilter')) {
      this.filter = {
        ...this.filter,
        ...JSON.parse(localStorage.getItem('providerFilter')),
      };
      console.log(JSON.parse(localStorage.getItem('providerFilter')));
      localStorage.removeItem('providerFilter');
    }
    this.getProviderList();
    this.getProviderRigesterTypeDDL();
  }
  getProviderRigesterTypeDDL() {
    this.busyLoadingProviderType = true;
    this.identityService.getProviderRigesterTypeDDL().subscribe(
      (res: any) => {
        this.busyLoadingProviderType = false;
        this.providerTypeList = res.returnData;
      },
      (err) => {
        console.log(err);
        this.busyLoadingProviderType = false;
      }
    );
  }

  filterProviders(event) {
    this.filter.Registertype = event;
    this.getProviderList();
  }
  resetFilter() {
    this.filter = new ProviderFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getProviderList();
  }

  navigateTO(provider: { event: ProviderIdentity; type: string }) {
    switch (provider.type) {
      case 'location':
        this.router.navigate([
          `provider-tricking/${provider.event.applicationUserId}`,
        ]);
        break;
      case 'driverSubscription':
        this.router.navigateByUrl(
          `/provider-subscription/view/${provider.event.applicationUserId}`
        );
        break;
      case 'workTimeReport':
        this.router.navigateByUrl(`/report/work-time/${provider.event.id}`);
        break;
      case 'wallet':
        this.router.navigateByUrl(
          `/provider-wallet/${provider.event.id}/create`
        );
        break;
      case 'providerNotes':
        this.router.navigateByUrl(`/providers/notes/${provider.event.id}`);
        break;

      default:
        break;
    }
  }

  getProviderList() {
    let ProviderApi$;
    switch (this.driverType) {
      case 'busyDeliveryProviders':
        ProviderApi$ = this.providerService.BusyProvidersInDeliveryOrders(
          this.filter
        );
        break;
      case 'busyTransportProviders':
        ProviderApi$ = this.providerService.BusyProvidersInTransportOrders(
          this.filter
        );
        break;
      case 'providersHaveOneOrderAtLeast':
        ProviderApi$ = this.providerService.ProvidersHaveOneOrderAtLeast(
          this.filter
        );
        break;

      default:
        break;
    }
    this.busyLoading = true;
    this.spinner.show();
    ProviderApi$.subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        // res.data = res.data.map((provider) => {
        //   provider.gender =
        //     provider.gender == 1
        //       ? this.translate.instant('global.male')
        //       : this.translate.instant('global.female');
        //   return provider;
        // });
        this.providerList = res.returnData.data;
        delete res.returnData.data;
        this.pagination = { ...res.returnData };
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.busyLoading = false;
      }
    );
  }

  downloadExcelFile() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.providerService.ProvidersHaveOneOrderAtLeast(downloadFilter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.excelService.exportAsExcelFile(res.returnData.data, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.identityService
      .changeUserActivate(this.providerList[index].applicationUserId)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getProviderList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  approveProvider(index: number) {
    console.log(index);
    this.spinner.show();
    this.identityService
      .approveProvider(String(this.providerList[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getProviderList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getProviderList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getProviderList();
  }
  navigate(provider: ProviderIdentity, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([
          `identity/providers/edit/${provider.applicationUserId}`,
        ]);
        break;
      case this.formMode.View:
        this.router.navigate([
          `identity/providers/view/${provider.applicationUserId}`,
        ]);
        break;

      default:
        break;
    }
  }

  openWindow(key) {
    switch (key) {
      case 'TrackingDeliveryProvider':
        window.open(
          'https://api.faster.sa:7080/Tracking/TrackingDeliveryProvider',
          '_blank',
          'location=yes,height=570,width=520,scrollbars=yes,status=yes'
        );
        break;
      case 'TrackingTaxiProvider':
        window.open(
          'https://api.faster.sa:7080/Tracking/TrackingTaxiProvider',
          '_blank',
          'location=yes,height=570,width=520,scrollbars=yes,status=yes'
        );
        break;
      case 'TrackingTransportProvider':
        window.open(
          'https://api.faster.sa:7080/Tracking/TrackingTransportProvider',
          '_blank',
          'location=yes,height=570,width=520,scrollbars=yes,status=yes'
        );
        break;

      default:
        break;
    }
  }
}
