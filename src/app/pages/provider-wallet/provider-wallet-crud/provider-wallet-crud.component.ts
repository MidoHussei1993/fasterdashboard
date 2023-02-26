import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { ProviderWallet, ProviderWalletFilter } from '../models';
import { ProviderWalletService } from '../services';

@Component({
  selector: 'app-provider-wallet-crud',
  templateUrl: './provider-wallet-crud.component.html',
  styleUrls: ['./provider-wallet-crud.component.scss'],
})
export class ProviderWalletCrudComponent implements OnInit {
  @ViewChild('imgViewer', { static: false }) imgViewer: ImgViewerComponent;

  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  currentAvailableMoney: number = 0;
  orderType: number = 3;

  orderNumber: number = null;

  providerTransactionsList: ProviderWallet[] = [];
  titles: string[] = [
    'moneyTransferImage',
    'forgetPassword.userName',
    'field.phoneNumber',
    'field.ProviderFullName',
    'field.ProviderPhone',
    'field.deliveryOrderId',
    'field.TransportOrderId',
    'country.Date',
    'provider.operation_amount',
    'field.note',
    'provider.operation',
  ];
  properties: string[] = [
    'moneyTransferImage',
    'actionUserName',
    'actionUserPhone',
    'providerName',
    'providerPhoneNumber',
    'deliveryOrderId',
    'transportOrderId',
    'createAt',
    'amount',
    'note',
    'type',
  ];
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  filter: ProviderWalletFilter = new ProviderWalletFilter();
  active: number = 1;

  providerInfo: any = {};
  walletNotes: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private providerWalletService: ProviderWalletService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      amount: ['', [Validators.required]],
      type: ['', Validators.required],
      providerId: [+this.route.snapshot.params.id, [Validators.required]],
      note: ['', Validators.required],
      moneyTransferImage: [null],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.providerName) {
      this.providerInfo = { ...this.route.snapshot.queryParams };
    }
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getProviderWallet();
    this.getAvalibleMoney();
    this.getWalletNotesDDL();
  }
  getProviderWallet() {
    this.busyLoading = true;
    this.spinner.show();
    this.filter.ProviderId = this.route.snapshot.params.id;
    this.providerWalletService.getProviderWallet(this.filter).subscribe(
      (res: List<ProviderWallet>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.providerTransactionsList = res.data.map((item) => {
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
        this.busyLoading = false;
      }
    );
  }

  async handleInputChange(event) {
    const file = event.target.files[0];
    this.providerWalletService.UploadImage(file).subscribe((res) => {
      this.form.get('moneyTransferImage').patchValue(res.returnData.response);
    });
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getProviderWallet();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getProviderWallet();
  }

  navigateToOrder(providerWallet: ProviderWallet | any) {
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
      return this.notifier.notify('error', 'no order');
    }
  }
  getAvalibleMoney() {
    this.providerWalletService
      .GetProviderWalletSum(this.route.snapshot.params.id)
      .subscribe(
        (res) => {
          this.currentAvailableMoney = res;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          // this.notifier.notify('error',err)
        }
      );
  }
  create() {
    this.form.get('providerId').patchValue(+this.route.snapshot.params.id);
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    let body: any = this.form.value;
    switch (this.orderType) {
      case 1:
        if (!this.orderNumber) {
          this.notifier.notify(
            'error',
            this.translate.instant('_.orderRequired')
          );
          return;
        }
        body.deliveryOrderId = this.orderNumber;
        break;
      case 2:
        if (!this.orderNumber) {
          this.notifier.notify(
            'error',
            this.translate.instant('_.orderRequired')
          );
          return;
        }
        body.transportOrderId = this.orderNumber;
        break;
      case 3:
        delete body.transportOrderId;
        delete body.deliveryOrderId;
        break;
      default:
        break;
    }
    this.spinner.show();
    this.providerWalletService.create(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.getAvalibleMoney();
        this.getProviderWallet();
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
        this.getProviderWallet();
        this.getAvalibleMoney();
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
    this.providerWalletService.getProviderWallet(downloadFilter).subscribe(
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

  fireAction(item: { event: ProviderWallet; type: string }) {
    switch (item.type) {
      case 'viewImage':
        this.viewImage(item.event.moneyTransferImage);
        break;

      default:
        break;
    }
  }

  viewImage(img) {
    if (!img) {
      this.notifier.notify('error', this.translate.instant('_.noImage'));
      return;
    }
    this.imgViewer.img = img;
    this.imgViewer.openBackDropCustomClass();
  }

  getWalletNotesDDL() {
    this.providerWalletService.getWalletNotesDDL().subscribe(
      (res) => {
        this.walletNotes = res;
      },
      (err) => {}
    );
  }
}
