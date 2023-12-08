import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerWallet, Pagination } from 'src/app/shared';
import { CustomerWalletService } from 'src/app/shared/services/customer-wallet.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ProviderWallet } from '../../provider-wallet/models';
import { ProviderWalletService } from '../../provider-wallet/services';
import { ApproveWalletFilter } from '../models';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-approve-wallet-list',
  templateUrl: './approve-wallet-list.component.html',
  styleUrls: ['./approve-wallet-list.component.scss'],
})
export class ApproveWalletListComponent implements OnInit {
  customerWalletList: CustomerWallet[] = [];
  titles: string[] = [
    'forgetPassword.userName',
    'field.phoneNumber',
    'field.deliveryOrderId',
    'field.TransportOrderId',
    'country.Date',
    'provider.operation_amount',
    'field.note',
    'provider.operation',
  ];
  properties: string[] = [
    'actionUserName',
    'actionUserPhone',
    'deliveryOrderId',
    'transportOrderId',
    'createAt',
    'amount',
    'note',
    'type',
  ];
  pagination: Pagination = new Pagination();
  filter: ApproveWalletFilter = new ApproveWalletFilter();

  providerWalletList: ProviderWallet[] = [];
  providerTitles: string[] = [
    'forgetPassword.userName',
    'field.phoneNumber',
    'field.deliveryOrderId',
    'field.TransportOrderId',
    'country.Date',
    'provider.operation_amount',
    'field.note',
    'provider.operation',
  ];
  providerProperties: string[] = [
    'actionUserName',
    'actionUserPhone',
    'deliveryOrderId',
    'transportOrderId',
    'createAt',
    'amount',
    'note',
    'type',
  ];
  providerPagination: Pagination = new Pagination();
  providerFilter: ApproveWalletFilter = new ApproveWalletFilter();

  constructor(
    private customerWalletService: CustomerWalletService,
    private providerWalletService: ProviderWalletService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private notify: NotifierService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.approveTransaction')
    );
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getcustomerList();

    // ==========provider==========
    this.providerFilter.PageNumber = 1;
    this.providerFilter.PageSize = 10;
    this.getProviderList();
  }

  searchValue(): void {
    this.getcustomerList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ApproveWalletFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getcustomerList();
  }

  getcustomerList() {
    this.spinner.show();
    this.customerWalletService
      .GetWalletsAddjestmentsNotApproved(this.filter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.customerWalletList = res.data.map((item) => {
            if (item.type == 1) {
              item.type = this.translate.instant('action.Withdrawal');
            } else if (item.type == 2) {
              item.type = this.translate.instant('action.deposit');
            }
            return item;
          });
          this.pagination = { ...res };
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getcustomerList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getcustomerList();
  }

  customerAction(customer: { event: CustomerWallet; type: string }) {
    switch (customer.type) {
      case 'approve':
        this.swalService.Confirmation().then((res) => {
          if (res) {
            this.spinner.show();
            this.customerWalletService.approve(customer.event.id).subscribe(
              (res) => {
                this.spinner.hide();
                this.notify.notify(
                  'success',
                  this.translate.instant('action.approved')
                );
                this.getcustomerList();
              },
              (err) => {
                this.spinner.hide();
                this.notify.notify(
                  'error',
                  this.translate.instant('action.notapproved')
                );
                console.log(err);
              }
            );
          }
        });
        break;
      case 'delete':
        this.swalService.Confirmation().then((res) => {
          if (res) {
            this.spinner.show();
            this.customerWalletService.notApprove(customer.event.id).subscribe(
              (res) => {
                this.spinner.hide();
                this.notify.notify(
                  'success',
                  this.translate.instant('global.deleted')
                );
                this.getcustomerList();
              },
              (err) => {
                this.spinner.hide();
                this.notify.notify(
                  'error',
                  this.translate.instant('global.server_error')
                );
                console.log(err);
              }
            );
          }
        });
        break;
      case 'navigateToCustomer':
        const wallet = this.router.serializeUrl(
          this.router.createUrlTree([`/identity/customers`], {
            queryParams: {
              customerId: customer.event.customerId,
            },
          })
        );
        window.open(wallet, '_blank');
        break;

      default:
        break;
    }
  }

  // ======================================PROVIDER=============================================

  getProviderList() {
    this.spinner.show();
    console.log(this.providerFilter);
    this.providerWalletService
      .GetWalletsAddjestmentsNotApproved(this.providerFilter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.providerWalletList = res.data.map((item) => {
            if (item.type == 1) {
              item.type = this.translate.instant('action.Withdrawal');
            } else if (item.type == 2) {
              item.type = this.translate.instant('action.deposit');
            }
            return item;
          });
          delete res.data;
          this.providerPagination = { ...res };
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }
  searchValueProvider(): void {
    this.getProviderList();
  }

  resetfilterProvider() {
    let pagePagination = {
      PageNumber: this.providerFilter.PageNumber,
      PageSize: this.providerFilter.PageSize,
    };
    this.providerFilter = new ApproveWalletFilter();
    this.providerFilter.PageNumber = pagePagination.PageNumber;
    this.providerFilter.PageSize = pagePagination.PageSize;
    this.getProviderList();
  }

  setProviderPageSize(pageSize) {
    if (pageSize == this.providerFilter.PageSize) return;
    this.providerFilter.PageSize = pageSize;
    this.getProviderList();
  }

  setProviderPageNumber(pageNumber: number) {
    console.log(
      '🚀 ~ file: approve-wallet-list.component.ts:259 ~ ApproveWalletListComponent ~ setProviderPageNumber ~ pageNumber',
      pageNumber
    );
    if (pageNumber == this.providerFilter.PageNumber) return;
    this.providerFilter.PageNumber = pageNumber;
    this.getProviderList();
  }

  providerAction(customer: { event: ProviderWallet; type: string }) {
    console.log(customer);
    switch (customer.type) {
      case 'approve':
        this.swalService.Confirmation().then((res) => {
          if (res) {
            this.spinner.show();
            this.providerWalletService.approve(customer.event.id).subscribe(
              (res) => {
                this.spinner.hide();
                this.notify.notify(
                  'success',
                  this.translate.instant('action.approved')
                );
                this.getProviderList();
              },
              (err) => {
                this.spinner.hide();
                this.notify.notify(
                  'error',
                  this.translate.instant('global.server_error')
                );
                console.log(err);
              }
            );
          }
        });
        break;
      case 'delete':
        this.swalService.Confirmation().then((res) => {
          if (res) {
            this.spinner.show();
            this.providerWalletService.notApprove(customer.event.id).subscribe(
              (res) => {
                this.spinner.hide();
                this.notify.notify(
                  'success',
                  this.translate.instant('action.notapproved')
                );
                this.getProviderList();
              },
              (err) => {
                this.spinner.hide();
                this.notify.notify(
                  'error',
                  this.translate.instant('global.server_error')
                );
                console.log(err);
              }
            );
          }
        });
        break;
      case 'navigateToProvider':
        const wallet = this.router.serializeUrl(
          this.router.createUrlTree([`/identity/providers`], {
            queryParams: {
              phoneNumber: customer.event.providerPhoneNumber,
            },
          })
        );
        window.open(wallet, '_blank');
        break;

      default:
        break;
    }
  }

  navigateToOrder(providerWallet: ProviderWallet | CustomerWallet | any) {
    console.log(providerWallet);

    if (providerWallet.deliveryOrderId) {
      const deliveryOrderPage = this.router.serializeUrl(
        this.router.createUrlTree([
          `report/delivery-order/edit/${providerWallet.deliveryOrderId}`,
        ])
      );
      window.open(deliveryOrderPage, '_blank');
    } else if (providerWallet.transportOrderId) {
      const transportOrderPage = this.router.serializeUrl(
        this.router.createUrlTree([
          `report/transport-order/details/${providerWallet.transportOrderId}`,
        ])
      );
      window.open(transportOrderPage, '_blank');
    } else {
      return this.notify.notify('error', 'no order');
    }
  }
}
