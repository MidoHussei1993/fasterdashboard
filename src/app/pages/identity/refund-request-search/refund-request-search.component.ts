import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent, RefundRequestSearchFilter } from 'src/app/shared';
import { CustomerWalletService } from 'src/app/shared/services/customer-wallet.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { MoyaserService } from '../../moyaser/services/moyaser.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-refund-request-search',
  templateUrl: './refund-request-search.component.html',
  styleUrls: ['./refund-request-search.component.scss'],
})
export class RefundRequestSearchComponent
  extends ListComponent<any, RefundRequestSearchFilter>
  implements OnInit
{
  constructor(
    private customerWalletService: CustomerWalletService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private swalModalService: SwalModalService,
    private headerService: HeaderService,
    private moyaserService: MoyaserService
  ) {
    super(customerWalletService, notifier, spinner, translate, route, router);
    this.titles = [
      'field.Date',
      'field.customerName',
      'field.CustomerPhone',
      'amount',
      'isApprovedByAdmin',
      'field.note',
    ];
    this.properties = [
      'createAt',
      'customerName',
      'customerPhoneNumber',
      'amount',
      'isApprovedByAdmin',
      'note',
    ];
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.RefundRequestSearch')
    );
    this.navigateTo = 'additional-component';
    this.filter = new RefundRequestSearchFilter();
    if (this.route.snapshot.queryParams.additionalComponentTitleId) {
      this.filter.AdditionalComponentTitleId =
        this.route.snapshot.queryParams.additionalComponentTitleId;
    }
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getList();
  }

  getList() {
    console.log('get list of items');
    this.spinner.show();
    this.customerWalletService.getRefundRequestSearch(this.filter).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        this.list = res.data.map((item: any) => {
          if (item.isApprovedByAdmin)
            item.isApprovedByAdmin = this.translate.instant('action.yes');
          else item.isApprovedByAdmin = this.translate.instant('action.no');
          return item;
        });
        delete res.data;
        this.pagination = res;
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  fireAction(item: { event: any; type: string }) {
    switch (item.type) {
      case 'acceptRequest':
        this.swalModalService
          .Confirmation(
            this.translate.instant('action.sure'),
            `<strong>${
              this.translate.instant('refundAmount') + item.event.amount
            }</strong>`
          )
          .then((res) => {
            if (res) {
              this.spinner.show();
              this.moyaserService
                .refundPayment({
                  customerId: item.event.customerId,
                  paymentId: item.event.paymentId,
                  amount: item.event.amount,
                })
                .subscribe(
                  (res) => {
                    this.spinner.hide();
                    this.notifier.notify(
                      'success',
                      this.translate.instant('action.done')
                    );
                    this.getList();
                  },
                  (err) => {
                    this.spinner.hide();
                    this.notifier.notify(
                      'error',
                      this.translate.instant('global.server_error')
                    );
                    console.log(err);
                  }
                );
            }
          });
        break;
      case 'cancelRequest':
        this.swalModalService
          .Confirmation(
            this.translate.instant('action.sure'),
            `<strong>${
              this.translate.instant('refundAmount') + item.event.amount
            }</strong>`
          )
          .then((res) => {
            if (res) {
              this.spinner.show();
              this.customerWalletService.RejectRefund(item.event.id).subscribe(
                (res) => {
                  this.spinner.hide();
                  this.notifier.notify(
                    'success',
                    this.translate.instant('action.done')
                  );
                  this.getList();
                },
                (err) => {
                  this.spinner.hide();
                  this.notifier.notify(
                    'error',
                    this.translate.instant('global.server_error')
                  );
                  console.log(err);
                }
              );
            }
          });
        break;

      default:
        break;
    }
  }

  resetfilter() {
    this.filter = new RefundRequestSearchFilter();
  }
}
