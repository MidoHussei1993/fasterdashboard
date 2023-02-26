import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderWalletService } from 'src/app/pages/provider-wallet/services';
import { ProviderService } from 'src/app/pages/provider/services';
import { Customer, CustomerService, Dropdown, FormMode } from 'src/app/shared';
import { Marker } from 'src/app/shared/components';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';
import { CustomerWalletService } from 'src/app/shared/services/customer-wallet.service';
import { ReportsService } from '../../services/reports.service';
import { TransportOrderService } from '../../services/transport-order.service';

@Component({
  selector: 'app-transport-order-details',
  templateUrl: './transport-order-details.component.html',
  styleUrls: ['./transport-order-details.component.scss'],
})
export class TransportOrderDetailsComponent implements OnInit {
  busyLoading: boolean = false;
  mainObject: any = {};
  // locationList: google.maps.LatLngLiteral[] = [];
  // mapMarkerTitles:string[] = [
  //   this.translate.instant('field.puckup'),
  //   this.translate.instant('field.dropOff')
  // ];
  currentLanguage: string = '';
  @ViewChild('customerModel', { static: false }) customerModel;
  @ViewChild('providerModel', { static: false }) providerModel;
  @ViewChild('stateModel', { static: false }) stateModel;
  statusList: Dropdown[] = [];
  customerData: Customer = new Customer();
  providerData: any = {};
  customerForm: FormGroup;
  providerForm: FormGroup;
  noteForm: FormGroup;
  form: FormGroup;
  mode: FormMode;
  providerMark:Marker;
  locationList:Marker[];

  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private modalService: NgbModal,
    private customerService: CustomerService,
    private providerService: ProviderService,
    private formBuilder: FormBuilder,
    private customerWalletService: CustomerWalletService,
    private notifier: NotifierService,
    private providerWalletService: ProviderWalletService,
    private orderStatusService: OrderStatusService,
    private transportOrderService: TransportOrderService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      id: [0],
      amount: ['', Validators.required],
      type: ['', Validators.required],
      customerId: ['', Validators.required],
      note: ['', Validators.required],
      transportOrderId: ['', Validators.required],
    });
    this.providerForm = this.formBuilder.group({
      id: [0],
      amount: ['', [Validators.required]],
      type: ['', Validators.required],
      providerId: [+this.route.snapshot.params.id, [Validators.required]],
      transportOrderId: ['', Validators.required],
      note: ['', Validators.required],
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
    this.TransportOrderDetailsDataReport();
    this.getStatusDropdown();
    this.getNote();
  }
  getStatusDropdown(): void {
    this.orderStatusService.TransportOrderStatusDDL().subscribe(
      (res) => {
        this.statusList = res;
      },
      (err) => {}
    );
  }

  openModal(prop: string) {
    this.modalService.open(this[prop], {
      backdropClass: 'light-blue-backdrop',
    });
  }
  getCustomerData(id: number) {
    // this.router.navigateByUrl(`identity/customers?customerPhone=${id}`)

    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        [`/identity/customers`],
        { queryParams: { customerPhone: id } }
      )
    );
    window.open(url, '_blank');
  }
  getProviderData(id: number) {
    // this.router.navigateByUrl(`identity/providers?ProviderId=${id}`)
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        [`/identity/providers`],
        { queryParams: { ProviderId: id } }
      )
    );
    window.open(url, '_blank');
  }

  TransportOrderDetailsDataReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportService
      .TransportOrderDetailsDataReport(this.route.snapshot.params.id)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.form.get('newStatusId').patchValue(res.transportOrder.statusId);
          this.busyLoading = false;
          this.mainObject = res;
          // this.locationList.push({lat: +res.transportOrder.customerLatitude ,lng: +res.transportOrder.customerLongitude})
          // this.locationList.push({lat: +res.transportOrder.orderLatitude ,lng: +res.transportOrder.orderLongitude});
          this.locationList = [
            {
              position: {
                lat: +res.transportOrder.customerLatitude,
                lng: +res.transportOrder.customerLongitude,
              },
              icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              label: {
                color: 'blue',
                text: this.translate.instant('field.puckup'),
              },
              title: this.translate.instant('field.puckup'),
              options: { animation: google.maps.Animation.DROP },
            },
            {
              position: {
                lat: +res.transportOrder.orderLatitude,
                lng: +res.transportOrder.orderLongitude,
              },
              icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              label: {
                color: 'green',
                text: this.translate.instant('field.dropOff'),
              },
              title: this.translate.instant('field.dropOff'),
              options: { animation: google.maps.Animation.DROP },
            }

          ];
          let approvedDriver = res.transportOrderOfferPrices.filter(item => item.isApprovedByCustomer == true);
          if (approvedDriver.length) {
              this.locationList.push({
                position: {
                  lat: +approvedDriver[0].providerLatitude,
                  lng: +approvedDriver[0].providerLongitude,
                },
                label: {
                  color: 'red',
                  text: this.translate.instant('field.prvider'),
                },
                title: this.translate.instant('field.prvider'),
                options: { animation: google.maps.Animation.BOUNCE },
              })
          }
        },
        (err) => {
          this.spinner.hide();
          this.busyLoading = false;
        }
      );
  }
  sendToCustomerWallet() {
    this.customerForm.markAllAsTouched();
    this.customerForm
      .get('customerId')
      .patchValue(this.mainObject.transportOrder.customerId);
    this.customerForm
      .get('transportOrderId')
      .patchValue(this.mainObject.transportOrder.id);
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
    let provider = this.mainObject.transportOrderOfferPrices.filter(
      (item) => item.isApprovedByCustomer == true
    )[0];
    this.providerForm.get('providerId').patchValue(provider.providerId);
    this.providerForm
      .get('transportOrderId')
      .patchValue(this.mainObject.transportOrder.id);
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
    this.orderStatusService.UpdateTransportOrderStatus(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.TransportOrderDetailsDataReport();
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
    this.noteForm.get('id').patchValue(this.route.snapshot.params.id)
    if (!this.noteForm.valid) return;
    let body = this.noteForm.value;
    this.spinner.show();
    this.transportOrderService.UpdateNote(body).subscribe(
      (result) => {
        this.spinner.hide();
        // this.noteForm.reset()
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
    this.transportOrderService.getNote(this.route.snapshot.params.id).subscribe(
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
}
