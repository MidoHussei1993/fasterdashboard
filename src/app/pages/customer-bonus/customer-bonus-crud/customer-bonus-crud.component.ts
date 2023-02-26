import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { CustomerOrderBounsService } from '../services/customer-order-bouns.service';

@Component({
  selector: 'app-customer-bonus-crud',
  templateUrl: './customer-bonus-crud.component.html',
  styleUrls: ['./customer-bonus-crud.component.scss'],
})
export class CustomerBonusCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  customersOrders: any[] = [];
  titles: string[] = [
    'field.customerId',
    'field.customerName',
    'menu.order',
    'field.Date',
    'field.deliveryOrderId',
    'field.TransportOrderId',
  ];
  properties: string[] = [
    'customerId',
    'customerName',
    'customerOrderCount',
    'createAt',
   'deliveryOrderId', 
   'transportOrderId',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerOrderBonusService: CustomerOrderBounsService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      deliveryBonus: [null, [Validators.required]],
      taxiBonus: [null, [Validators.required]],
      transportBonus: [null, [Validators.required]],
      startAt: ['', [Validators.required]],
      endAt: ['', [Validators.required]],
      allowedOrderCountPerCustomer: [null, [Validators.required]],
      limitations: [null, [Validators.required]],
      isActive: [true, [Validators.required]],
      isValue: [true, [Validators.required]],
      isForNewCutomer: [true, [Validators.required]],
      minOrderAmount: [0],
      maxBonusValue: [0],

    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getCustomerOrderBonusById(this.route.snapshot.params.id);
    }
  }

  getCustomerOrderBonusById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.customerOrderBonusService.getByID(id).subscribe(
      (res) => {
        this.spinner.hide();
        res.startAt = res.startAt;
        res.endAt = res.endAt;
        if (res.customersData) {
          if (res.customersData.length) {
            res.customersData.map((item) => {
              if (item.customersOrders.length) {
                item.customersOrders.map((child) => {
                  this.customersOrders.push({
                    customerId: item.customerId,
                    customerName: item.customerName,
                    customerOrderCount: item.customerOrderCount,
                    customerPhone: item.customerPhone,
                    createAt: child.createAt,
                    deliveryOrderId: child.deliveryOrderId,
                    transportOrderId: child.transportOrderId,
                  });
                });
              }
            });
          }
        }
        this.busyLoading = false;
        this.form.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    console.log(this.form);
    if (this.mode === FormMode.Create) {
      this.create();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.customerOrderBonusService.create(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
        this.form.reset();
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
}
