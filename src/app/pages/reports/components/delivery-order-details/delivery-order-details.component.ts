import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderWalletService } from 'src/app/pages/provider-wallet/services';
import { ProviderService } from 'src/app/pages/provider/services';
import { Shop } from 'src/app/pages/shop/models';
import { ShopService } from 'src/app/pages/shop/services';
import { Customer, CustomerService, Dropdown, FormMode } from 'src/app/shared';
import { Marker } from 'src/app/shared/components';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';
import { CustomerWalletService } from 'src/app/shared/services/customer-wallet.service';
import { isShop } from 'src/app/util/access-storge';
import { DeliveryOrderService } from '../../services/delivery-order.service';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-delivery-order-details',
  templateUrl: './delivery-order-details.component.html',
  styleUrls: ['./delivery-order-details.component.scss'],
})
export class DeliveryOrderDetailsComponent implements OnInit {
  busyLoading: boolean = false;
  @ViewChild('imgViewer', { static: false }) imgViewer: ImgViewerComponent;

  mainObject: any = {};
  locationList: google.maps.LatLngLiteral[] = [];
  mapMarkerTitles: string[] = [
    this.translate.instant('field.customer'),
    this.translate.instant('shop.shop'),
  ];
  currentLanguage: string = '';
  @ViewChild('customerModel', { static: false }) customerModel;
  @ViewChild('providerModel', { static: false }) providerModel;
  @ViewChild('shopModel', { static: false }) shopModel;
  @ViewChild('stateModel', { static: false }) stateModel;
  @ViewChild('orderAmountPriceModal', { static: false }) orderAmountPriceModal;
  statusList: Dropdown[] = [];
  customerData: Customer = new Customer();
  providerData: any = {};
  shopData: Shop = new Shop();
  customerForm: FormGroup;
  providerForm: FormGroup;
  form: FormGroup;
  mode: FormMode;
  noteForm: FormGroup;
  providerMark: Marker[] = [];
  walletNotes: any[] = [];
  additionalComponents: any[] = [];
  orderAmountPrice: number = 0;
  isShop: boolean = false;

  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private customerService: CustomerService,
    private providerService: ProviderService,
    private shopService: ShopService,
    private formBuilder: FormBuilder,
    private customerWalletService: CustomerWalletService,
    private notifier: NotifierService,
    private orderStatusService: OrderStatusService,
    private deliveryOrderService: DeliveryOrderService,
    private providerWalletService: ProviderWalletService,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      id: [0],
      amount: ['', Validators.required],
      type: ['', Validators.required],
      customerId: ['', Validators.required],
      note: ['', Validators.required],
      deliveryOrderId: ['', Validators.required],
      moneyTransferImage: [null],
    });
    this.providerForm = this.formBuilder.group({
      id: [0],
      amount: ['', [Validators.required]],
      type: ['', Validators.required],
      providerId: [+this.route.snapshot.params.id, [Validators.required]],
      deliveryOrderId: ['', Validators.required],
      note: ['', Validators.required],
      moneyTransferImage: [null],
    });
    this.form = this.formBuilder.group({
      orderId: [this.route.snapshot.params.id],
      newStatusId: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.noteForm = this.formBuilder.group({
      id: [0],
      adminNote: ['', [Validators.required]],
    });
    this.mode = this.route.snapshot.data.mode;
  }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
    this.DeliveryOrderDetailsDataReport();
    this.getStatusDropdown();
    this.getNote();
    this.isShop = isShop();
    if (!this.isShop) this.getWalletNotesDDL();
  }

  getStatusDropdown(): void {
    this.orderStatusService.DeliveryOrderStatusDDL().subscribe(
      (res) => {
        this.statusList = res;
      },
      (err) => {}
    );
  }

  RefundAmountRequestByOrderId() {
    this.spinner.show();
    this.customerWalletService
      .RefundAmountRequestByOrderId(+this.route.snapshot.params.id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (res) {
            if (res.errorMessage) {
              this.notifier.notify('error', res.errorMessage);
            }
            if (res.isSucceeded) {
              this.notifier.notify('success', res.returnData);
            }
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  ChangeOrderAmountPrice() {
    this.spinner.show();
    this.deliveryOrderService
      .ChangeOrderAmountPrice(
        +this.route.snapshot.params.id,
        String(this.orderAmountPrice)
      )
      .subscribe(
        (res) => {
          this.modalService.dismissAll();
          this.spinner.hide();

          this.orderAmountPrice = 0;
        },
        (err) => {
          this.modalService.dismissAll();
          this.spinner.hide();

          this.orderAmountPrice = 0;
        }
      );
  }

  openModal(prop: string) {
    this.modalService.open(this[prop], {
      backdropClass: 'light-blue-backdrop',
    });
  }
  getCustomerData(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/identity/customers`], {
        queryParams: { customerPhone: id },
      })
    );
    window.open(url, '_blank');
  }
  getProviderData(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/identity/providers`], {
        queryParams: { ProviderId: id },
      })
    );
    window.open(url, '_blank');
  }
  getShopData() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/shop-branch`], {
        queryParams: {
          shopId: this.mainObject.deliveryOrder.shopId,
          shopBranchId: this.mainObject.deliveryOrder.shopBranchId,
        },
      })
    );
    window.open(url, '_blank');
  }

  DeliveryOrderDetailsDataReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportService
      .DeliveryOrderDetailsDataReport(this.route.snapshot.params.id)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.form.get('newStatusId').patchValue(res.deliveryOrder.statusId);
          this.busyLoading = false;
          // res.carts = res.carts.map((cart) => {
          //     cart.additionalComponents
          //   let arr = [];
          //   if (cart.additionalComponents) {
          //     arr = cart.additionalComponents.map(
          //       ({ componentName, componentNameAr }) =>
          //         this.currentLanguage == 'ar' ? componentNameAr : componentName
          //     );
          //   }

          //   return cart;
          // });
          this.additionalComponents = res.carts.map(
            ({ additionalComponents }) => additionalComponents
          );
          console.log(
            '🚀 ~ file: delivery-order-details.component.ts:203 ~ DeliveryOrderDetailsComponent ~ DeliveryOrderDetailsDataReport ~ this.additionalComponents:',
            this.additionalComponents
          );
          this.mainObject = res;
          this.locationList.push({
            lat: res.deliveryOrder.latitude,
            lng: res.deliveryOrder.longitude,
          });
          this.locationList.push({
            lat: res.deliveryOrder.shopBranchLatitude,
            lng: res.deliveryOrder.shopBranchLongitude,
          });
          let approvedDriver = res.deliveryOfferPrices.filter(
            (item) => item.isApprovedByCustomer == true
          );
          if (approvedDriver.length) {
            this.providerMark.push({
              position: {
                lat: +approvedDriver[0].providerLatitude,
                lng: +approvedDriver[0].providerLongitude,
              },
              icon: `http://maps.google.com/mapfiles/ms/icons/${this.getColorDependOnState(
                this.mainObject.deliveryOrder.statusId
              )}-dot.png`,
              label: {
                color: this.getColorDependOnState(
                  this.mainObject.deliveryOrder.statusId
                ),
                text: this.translate.instant('global.created'),
              },
              title: this.translate.instant('global.created'),
              options: { animation: google.maps.Animation.BOUNCE },
            });
          }
          if (res.trakingDeliveryOrderStatues.length) {
            let statusPoint = res.trakingDeliveryOrderStatues.map((item) => {
              return {
                position: {
                  lat: +item.providerLatitude,
                  lng: +item.providerLongitude,
                },
                icon: `http://maps.google.com/mapfiles/ms/icons/${this.getColorDependOnState(
                  item.statues
                )}-dot.png`,
                label: {
                  color: this.getColorDependOnState(item.statues),
                  text: item.statusName,
                },
                title: item.statusName,
                options: { animation: google.maps.Animation.BOUNCE },
              };
            });
            this.providerMark = [...this.providerMark, ...statusPoint];
          }
        },
        (err) => {
          this.busyLoading = false;
        }
      );
  }

  getColorDependOnState(state): string {
    switch (state) {
      case 1:
        return 'yellow';
        break;
      case 2:
        return 'pink';
        break;
      case 3:
        return 'green';
        break;
      case 4:
        return 'red';
        break;
      case 5:
        return 'purple';
        break;
      case 6:
        return 'orange';
        break;
      case 7:
        return 'blue';
        break;
      case 8:
        return 'yellow';
        break;
      case 9:
        return 'yellow';
        break;
      case 10:
        return 'pink';
        break;
      case 11:
        return 'green';
        break;
      case 12:
        return 'red';
        break;
      case 13:
        return 'purple';
        break;
      case 14:
        return 'orange';
        break;
      case 15:
        return 'blue';
        break;
      case 16:
        return 'yellow';
        break;

      default:
        break;
    }
  }

  sendToCustomerWallet() {
    this.customerForm.markAllAsTouched();
    this.customerForm
      .get('customerId')
      .patchValue(this.mainObject.deliveryOrder.customerId);
    this.customerForm
      .get('deliveryOrderId')
      .patchValue(this.mainObject.deliveryOrder.id);
    if (this.customerForm.valid) {
      this.customerWalletService.add(this.customerForm.value).subscribe(
        (result) => {
          this.customerForm.reset();
          this.customerForm.get('id').patchValue(0);
          this.spinner.hide();
          this.notifier.notify(
            'success',
            this.translate.instant('action.done')
          );
        },
        (err) => {
          this.spinner.hide();
          // this.notifier.notify('error',err)
        }
      );
    }
  }
  sendToProviderWallet() {
    this.providerForm.markAllAsTouched();
    let provider = this.mainObject.deliveryOfferPrices.filter(
      (item) => item.isApprovedByCustomer == true
    )[0];
    this.providerForm.get('providerId').patchValue(provider.providerId);
    this.providerForm
      .get('deliveryOrderId')
      .patchValue(this.mainObject.deliveryOrder.id);
    if (this.providerForm.valid) {
      this.providerWalletService.create(this.providerForm.value).subscribe(
        (result) => {
          this.providerForm.reset();
          this.providerForm.get('id').patchValue(0);
          this.spinner.hide();
          this.notifier.notify(
            'success',
            this.translate.instant('action.done')
          );
        },
        (err) => {
          this.spinner.hide();
          // this.notifier.notify('error',err)
        }
      );
    }
  }

  edit() {
    this.form.get('orderId').patchValue(this.route.snapshot.params.id);
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    let body = this.form.value;
    this.spinner.show();
    this.orderStatusService.UpdateDeliveryOrderStatus(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.DeliveryOrderDetailsDataReport();
        this.form.reset();
        this.modalService.dismissAll();
        this.notifier.notify(
          'success',
          this.translate.instant('global.edited')
        );
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
  addNote() {
    this.noteForm.markAllAsTouched();
    this.noteForm.get('id').patchValue(this.route.snapshot.params.id);
    if (!this.noteForm.valid) return;
    let body = this.noteForm.value;
    this.spinner.show();
    this.deliveryOrderService.UpdateNote(body).subscribe(
      (result) => {
        this.spinner.hide();
        // this.noteForm.reset();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }

  getNote() {
    this.spinner.show();
    this.deliveryOrderService.getNote(this.route.snapshot.params.id).subscribe(
      (res) => {
        this.spinner.hide();
        this.noteForm.get('adminNote').patchValue(res.adminNote);
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
  viewImage(img) {
    this.imgViewer.img = img;
    this.imgViewer.openBackDropCustomClass();
  }

  async uploadCustomerTransferImage(event) {
    const file = event.target.files[0];
    this.customerWalletService.UploadImage(file).subscribe((res) => {
      this.customerForm
        .get('moneyTransferImage')
        .patchValue(res.returnData.response);
    });
  }
  async uploadProviderTransferImage(event) {
    const file = event.target.files[0];
    this.providerWalletService.UploadImage(file).subscribe((res) => {
      this.providerForm
        .get('moneyTransferImage')
        .patchValue(res.returnData.response);
    });
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
