import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { ProviderAmountRequestFilter } from '../../provider-wallet/models';
import { ProviderWalletService } from '../../provider-wallet/services';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-amount-requests',
  templateUrl: './amount-requests.component.html',
  styleUrls: ['./amount-requests.component.scss'],
})
export class AmountRequestsComponent
  extends ListComponent<any, ProviderAmountRequestFilter>
  implements OnInit
{
  constructor(
    private providerWalletService: ProviderWalletService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private swalService: SwalModalService,
    private headerService: HeaderService,
    public router: Router
  ) {
    super(providerWalletService, notifier, spinner, translate, route, router);
    this.titles = [
      'field.Date',
      'field.ProviderName',
      'field.ProviderPhone',
      'actionUserName',
      'actionUserPhone',
      'isTransferred',
    ];
    this.properties = [
      'createAt',
      'providerName',
      'providerPhoneNumber',
      'actionUserName',
      'actionUserPhone',
      'isTransferred',
    ];
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.providerAmountRequests')
    );
    this.filter = new ProviderAmountRequestFilter();
    if (this.route.snapshot.queryParams.additionalComponentTitleId) {
      this.filter.AdditionalComponentTitleId =
        this.route.snapshot.queryParams.additionalComponentTitleId;
    }
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.providerWalletService.GetProviderAmountRequests(this.filter).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        this.list = res.data.map((item: any) => {
          if (item.isTransferred)
            item.isTransferred = this.translate.instant('action.yes');
          else item.isTransferred = this.translate.instant('action.no');
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

  navigateTO(item: { event: any; type: string }) {
    switch (item.type) {
      case 'accept':
        this.swalService.Confirmation().then((res) => {
          if (res) {
            this.spinner.show();
            this.providerWalletService
              .AcceptProviderAmountRequest(item.event.id)
              .subscribe(
                (res) => {
                  this.spinner.hide();
                  this.notifier.notify(
                    'success',
                    this.translate.instant('action.sure')
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
      case 'reject':
        this.swalService.Confirmation().then((res) => {
          if (res) {
            this.spinner.show();
            this.providerWalletService
              .RejectProviderAmountRequest(item.event.id)
              .subscribe(
                (res) => {
                  this.spinner.hide();
                  this.notifier.notify(
                    'success',
                    this.translate.instant('action.sure')
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
    this.filter = new ProviderAmountRequestFilter();
  }
}
