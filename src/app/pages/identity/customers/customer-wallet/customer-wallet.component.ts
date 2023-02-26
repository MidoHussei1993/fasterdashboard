import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderWalletService } from 'src/app/pages/provider-wallet/services';
import {
  CustomerWallet,
  CustomerWalletFilter,
  FormMode,
  Pagination,
} from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { CustomerWalletService } from 'src/app/shared/services/customer-wallet.service';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-customer-wallet',
  templateUrl: './customer-wallet.component.html',
  styleUrls: ['./customer-wallet.component.scss'],
})
export class CustomerWalletComponent implements OnInit {
  @ViewChild('imgViewer', { static: false }) imgViewer: ImgViewerComponent;
  mode: FormMode;
  form: FormGroup;
  currentLanguage: string = '';
  orderType: number = 3;
  orderNumber: number = null;
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
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  active: number = 1;
  busyLoading: boolean = false;
  currentAvailableMoney: number = 0;

  customerInfo: any = {};
  walletNotes: any[] = [];

  constructor(
    private router: Router,
    private customerWalletService: CustomerWalletService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private providerWalletService: ProviderWalletService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      amount: ['', Validators.required],
      type: ['', Validators.required],
      customerId: ['', Validators.required],
      note: ['', Validators.required],
      // deliveryOrderId: ['', Validators.required],
      moneyTransferImage: [null],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  filter: CustomerWalletFilter = new CustomerWalletFilter();

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.customerName) {
      this.customerInfo = { ...this.route.snapshot.queryParams };
    }
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCustomerWalletList();
    this.getAvalibleMoney();
    this.getWalletNotesDDL();
  }

  getCustomerWalletList() {
    this.spinner.show();
    this.busyLoading = true;
    this.customerWalletService
      .get(this.route.snapshot.params.id, this.filter)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.customerWalletList = res.data.map((item) => {
            if (item.type == 1) {
              item.type = this.translate.instant('action.Withdrawal');
            } else if (item.type == 2) {
              item.type = this.translate.instant('action.deposit');
            }
            return item;
          });
          delete res.data;
          this.pagination = { ...res };
        },
        (err) => {
          this.spinner.hide();
          this.busyLoading = false;
        }
      );
  }
  async handleInputChange(event) {
    const file = event.target.files[0];
    this.customerWalletService.UploadImage(file).subscribe((res) => {
      this.form.get('moneyTransferImage').patchValue(res.returnData.response);
    });
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCustomerWalletList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCustomerWalletList();
  }

  create() {
    this.form.get('customerId').patchValue(+this.route.snapshot.params.id);
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
    this.customerWalletService.add(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
        this.getCustomerWalletList();
        this.getAvalibleMoney();
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }

  navigateToOrder(providerWallet: CustomerWallet | any) {
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
      return this.notifier.notify('error', 'no order');
    }
  }

  getAvalibleMoney() {
    this.customerWalletService
      .GetCustomerWalletSum(this.route.snapshot.params.id)
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

  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.customerWalletService
      .get(this.route.snapshot.params.id, downloadFilter)
      .subscribe(
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

  fireAction(item: { event: CustomerWallet; type: string }) {
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
