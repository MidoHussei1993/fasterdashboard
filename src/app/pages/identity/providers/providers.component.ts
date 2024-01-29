import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Pagination,
  FormMode,
  List,
  Dropdown,
  CityService,
} from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { ProviderSubscriptionService } from '../../provider-subscription/services';
import { ProviderFilter, ProviderList } from '../../provider/models';
import { ProviderService } from '../../provider/services';
import { SubscriptionService } from '../../subscription/services';
import { VendorService } from '../../vendor/services/vendor.service';
import { IdentityFilter, ProviderIdentity } from '../models';
import { IdentityService, IList } from '../services/identity.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProviderWalletService } from '../../provider-wallet/services';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  @ViewChild('resetPass', { static: false }) resetPass;
  @ViewChild('subscription', { static: false }) subscription;
  @ViewChild('makeProviderAmountRequest', { static: false })
  makeProviderAmountRequest;
  @ViewChild('renewsubscriptionModal', { static: false })
  renewsubscriptionModal;
  providerList: ProviderList[] = [];
  titles: string[] = [
    'ID',
    'global.full_name',
    'provider.wallet',
    'global.phone_number',
    'provider.registertype',
    'field.statusName',
    'menu.vendor',
    'field.subscriptionIsExpired',
    'field.subscriptionRemainingDays',
  ];
  properties: string[] = [
    'id',
    'fullName',
    'walletSum',
    'phoneNumber',
    'registertype',
    'currentStatus',
    'vendorName',
    'subscriptionIsExpired',
    'subscriptionRemainingDays',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: ProviderFilter = new ProviderFilter();

  providerTypeList: any[] = [];
  busyLoadingProviderType: boolean = false;

  currentLanguage: string = '';
  form: FormGroup;
  rowData: ProviderIdentity = new ProviderIdentity();

  isAdmin: boolean = false;
  isVendor: boolean = false;
  actionList: any[] = [];
  subscriptionList: any[] = [];
  currentId: number;
  selectedSubscriptionId: number = null;
  vendorList: Dropdown[] = [];
  nationalityList: Dropdown[] = [];
  cityList: Dropdown[] = [];
  renewObject: any = {};
  currentProvider: any = {};

  constructor(
    private identityService: IdentityService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,
    private providerService: ProviderService,
    private notifier: NotifierService,
    private modalService: NgbModal,
    private subscriptionService: SubscriptionService,
    private providerSubscriptionService: ProviderSubscriptionService,
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private vendorService: VendorService,
    private cityService: CityService,
    private headerService: HeaderService,
    private providerWalletService: ProviderWalletService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentLanguage = this.translate.currentLang;
    this.form = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.providers'));
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    if (this.activatedRoute.snapshot.queryParams.ProviderId) {
      this.filter.ProviderId =
        this.activatedRoute.snapshot.queryParams.ProviderId;
    }
    if (this.activatedRoute.snapshot.queryParams.phoneNumber) {
      this.filter.phoneNumber =
        this.activatedRoute.snapshot.queryParams.phoneNumber;
    }
    if (localStorage.getItem('providerFilter')) {
      this.filter = {
        ...this.filter,
        ...JSON.parse(localStorage.getItem('providerFilter')),
      };
      localStorage.removeItem('providerFilter');
    }
    this.getProviderList();
    this.getProviderRigesterTypeDDL();
    let roles: any[] = JSON.parse(localStorage.getItem('roles'));
    this.isAdmin = roles.includes('administrator');
    if (this.isAdmin) {
      this.actionList = [
        { title: 'location', icon: 'la-map', type: 'location' },
        { title: 'provider.wallet', icon: 'la-wallet', type: 'wallet' },
        {
          title: 'menu.providerSubscription',
          icon: 'fa-users-cog',
          type: 'driverSubscription',
        },
        {
          title: 'provider.workTimeReport',
          icon: 'fa-business-time',
          type: 'workTimeReport',
        },
        {
          title: 'global.notes',
          icon: 'fa-sticky-note',
          type: 'providerNotes',
        },
        { title: 'menu.Change_Password', icon: 'fa-lock-open', type: 'reset' },
        {
          title: 'field.newSubscription',
          icon: 'fa-credit-card',
          type: 'subscribe',
        },
        { title: 'menu.motivations', icon: 'fa-fire-alt', type: 'motivations' },
        {
          title: 'field.AcceptanceRate',
          icon: 'fa-percent',
          type: 'AcceptanceRate',
        },
        {
          title: 'menu.order',
          icon: 'fa-truck',
          type: 'order',
        },
        {
          title: 'menu.userActionTracking',
          icon: 'fa-user-secret',
          type: 'userActionTracking',
        },
        {
          title: 'field.sendTookan',
          icon: 'fa-qrcode text-danger',
          type: 'sendTookan',
        },
        {
          title: 'sendToMeLink',
          icon: 'fa-external-link-alt',
          type: 'sendToMeLink',
        },
        {
          title: 'makeProviderAmountRequest',
          icon: 'fa-hand-holding-usd text-warning',
          type: 'makeProviderAmountRequest',
        },
      ];
    }
    this.isVendor = roles.includes('vender');
    if (this.isVendor) {
      delete this.filter.parentProviderId;
      this.actionList = [
        { title: 'location', icon: 'la-map', type: 'location' },
      ];
    }
    this.getVendorList();
    this.getSubscriptionDDL();
    this.getNationality();
    this.getCityList();
  }
  getNationality() {
    this.providerService.getNationality().subscribe(
      (res: any) => {
        this.nationalityList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCityList() {
    this.cityService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.cityList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getSubscriptionDDL() {
    this.subscriptionService.getSubscriptionDDL().subscribe(
      (res: any) => {
        this.subscriptionList = res.returnData;
      },
      (err) => {}
    );
  }
  getVendorList() {
    this.vendorService.getDropdown().subscribe(
      (res: any) => {
        this.vendorList = res;
      },
      (err) => {}
    );
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

  resetFilter() {
    this.filter = new ProviderFilter();
    if (this.isVendor) {
      delete this.filter.parentProviderId;
    }
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getProviderList();
  }

  filterProviders(event) {
    this.filter.Registertype = event;
    // this.getProviderList();
  }

  navigateTO(provider: { event: ProviderIdentity; type: string }) {
    switch (provider.type) {
      case 'userActionTracking':
        const userActionTracking = this.router.serializeUrl(
          this.router.createUrlTree([`/app/user-action-tracking`], {
            queryParams: {
              providerId: `Provider # ${provider.event.id}`,
            },
          })
        );
        window.open(userActionTracking, '_blank');
        break;
      case 'order':
        const orderUrl = this.router.serializeUrl(
          this.router.createUrlTree([
            `/providers/driver-order/${provider.event.id}`,
          ])
        );
        window.open(orderUrl, '_blank');
        break;
      case 'location':
        const locationUrl = this.router.serializeUrl(
          this.router.createUrlTree([
            `/provider-tricking/${provider.event.applicationUserId}`,
          ])
        );
        window.open(locationUrl, '_blank');
        break;
      case 'driverSubscription':
        const driverSubscription = this.router.serializeUrl(
          this.router.createUrlTree([
            `/provider-subscription/view/${provider.event.applicationUserId}`,
          ])
        );
        window.open(driverSubscription, '_blank');
        break;
      case 'workTimeReport':
        const workTimeReport = this.router.serializeUrl(
          this.router.createUrlTree([`/report/work-time/${provider.event.id}`])
        );
        window.open(workTimeReport, '_blank');
        break;
      case 'wallet':
        const wallet = this.router.serializeUrl(
          this.router.createUrlTree(
            [`/provider-wallet/${provider.event.id}/create`],
            {
              queryParams: {
                providerName: provider.event.fullName,
                providerPhone: provider.event.phoneNumber,
              },
            }
          )
        );
        window.open(wallet, '_blank');
        break;
      case 'motivations':
        const motivations = this.router.serializeUrl(
          this.router.createUrlTree([
            `/motivation/provider-motivation/${provider.event.id}`,
          ])
        );
        window.open(motivations, '_blank');
        break;
      case 'providerNotes':
        const providerNotes = this.router.serializeUrl(
          this.router.createUrlTree([`/providers/notes/${provider.event.id}`])
        );
        window.open(providerNotes, '_blank');
        break;
      case 'AcceptanceRate':
        const AcceptanceRate = this.router.serializeUrl(
          this.router.createUrlTree([
            `/identity/providers/acceptance-rate/${provider.event.id}`,
          ])
        );
        window.open(AcceptanceRate, '_blank');

        break;
      case 'reset':
        this.rowData = provider.event;
        this.openModal();
        break;
      case 'subscribe':
        this.currentId = provider.event.id;
        this.selectedSubscriptionId = null;
        this.modalService.open(this.subscription, {
          backdropClass: 'light-blue-backdrop',
        });
        break;
      case 'sendTookan':
        this.sendToken(provider);
        break;
      case 'sendToMeLink':
        this.sendToken(provider);
        break;
      case 'makeProviderAmountRequest':
        this.currentProvider = { ...provider.event };
        this.modalService.open(this.makeProviderAmountRequest, {
          size: 'lg',
        });
        break;

      default:
        break;
    }
  }

  sendToken(provider: { event: ProviderIdentity; type: string }) {
    this.spinner.show();
    this.providerService.sendToken(String(provider.event.id)).subscribe(
      (res) => {
        this.spinner.hide();
        this.notifier.notify('success', this.translate.instant('action.done'));
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  sendToMeLink(provider: { event: ProviderIdentity; type: string }) {
    this.spinner.show();
    this.providerService.sendToMeLink(String(provider.event.id)).subscribe(
      (res) => {
        this.spinner.hide();
        this.notifier.notify('success', this.translate.instant('action.done'));
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getProviderList() {
    this.busyLoading = true;
    this.spinner.show();
    this.providerService.get(this.filter).subscribe(
      (res: List<ProviderList>) => {
        this.spinner.hide();
        this.busyLoading = false;
        // res.data = res.data.map((provider) => {
        //   provider.gender =
        //     provider.gender == 1
        //       ? this.translate.instant('global.male')
        //       : this.translate.instant('global.female');
        //   return provider;
        // });
        this.providerList = res.data.map((item: any) => {
          if (item.subscriptionIsExpired) {
            item.subscriptionIsExpired = this.translate.instant('action.yes');
          } else {
            item.subscriptionIsExpired = this.translate.instant('action.no');
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
  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.identityService
      .changeUserActivate(this.providerList[index].applicationUserId)
      .subscribe(
        (res) => {
          this.spinner.hide();
          // this.getProviderList();
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
          // this.getProviderList();
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
        const editURl = this.router.serializeUrl(
          this.router.createUrlTree(
            [`/identity/providers/edit/${provider.applicationUserId}`],
            { queryParams: { providerId: provider.id } }
          )
        );
        window.open(editURl, '_blank');
        break;
      case this.formMode.View:
        const viewURl = this.router.serializeUrl(
          this.router.createUrlTree(
            [`/identity/providers/view/${provider.applicationUserId}`],
            { queryParams: { providerId: provider.id } }
          )
        );
        window.open(viewURl, '_blank');
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

  openModal() {
    this.modalService.open(this.resetPass, {
      backdropClass: 'light-blue-backdrop',
    });
  }
  resetPassword() {
    this.form.markAsTouched();
    this.form.get('userId').patchValue(this.rowData.applicationUserId);
    if (!this.form.valid) return;
    this.identityService.ResetPassword(this.form.value).subscribe(
      (result) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        this.form.reset();
        this.notifier.notify('success', this.translate.instant('action.done'));
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }

  selectProviderSubscription() {
    if (!this.selectedSubscriptionId) return;
    this.spinner.show();
    this.providerSubscriptionService
      .create({
        providerId: this.currentId,
        subscriptionId: this.selectedSubscriptionId,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.modalService.dismissAll();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  downloadExcelFile() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.providerService.get(downloadFilter).subscribe(
      (res: any) => {
        this.spinner.hide();
        let arr2 = res.data.map((item: any) => {
          if (item.subscriptionIsExpired) {
            item.subscriptionIsExpired = this.translate.instant('action.yes');
          } else {
            item.subscriptionIsExpired = this.translate.instant('action.no');
          }
          return item;
        });
        this.excelService.exportAsExcelFile(arr2, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  openRenewSubscriptionModal() {
    this.modalService.open(this.renewsubscriptionModal, {
      backdropClass: 'light-blue-backdrop',
    });
  }

  RenewDriversSubscriptionExpired() {
    if (!this.renewObject) return;
    this.spinner.show();
    this.providerSubscriptionService
      .RenewDriversSubscriptionExpired(this.renewObject)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.modalService.dismissAll();
          this.notifier.notify(
            'success',
            this.translate.instant('action.done')
          );
          this.renewObject = {};
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  MakeProviderAmountRequest() {
    this.spinner.show();
    this.providerWalletService
      .MakeProviderAmountRequest({
        providerId: this.currentProvider.id,
        amount: this.currentProvider.amount,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.modalService.dismissAll();
          this.notifier.notify(
            'success',
            this.translate.instant('action.done')
          );
        },
        (err) => {
          this.modalService.dismissAll();
          this.spinner.hide();
        }
      );
  }
}
