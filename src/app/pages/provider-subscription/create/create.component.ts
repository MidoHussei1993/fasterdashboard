import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Dropdown } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern } from 'src/app/shared';
import { ProviderService } from '../../provider/services';
import { SubscriptionService } from '../../subscription/services';
import { VendorService } from '../../vendor/services/vendor.service';
import { ProviderSubscriptionService } from '../services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  vendorForm: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  ProductId: number = null;
  providerList: any[] = [];
  busyLoadingProvider: boolean = false;
  subscriptionList: any[] = [];
  vendorList: any[] = [];
  busyLoadingSubscription: boolean = false; //

  phoneNumber: string = ''

  constructor(
    private providerSubscriptionService: ProviderSubscriptionService,
    private vendorService : VendorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private subscriptionService: SubscriptionService,
    private providerService: ProviderService
  ) {
    this.form = this.formBuilder.group({
      providerId: ['', [Validators.required]],
      subscriptionId: ['', [Validators.required]],
    });

    this.vendorForm = this.formBuilder.group({
      vendorId: ['', [Validators.required]],
      subscriptionId: ['', [Validators.required]],
    });
    // this.form.get('providerId').disable();
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getProviderDDL();
    this.getSubscriptionDDL();
    this.getVendorDDL();
  }

  GetProviderByPhoneNumber(phoneNumber:string){
    this.spinner.show();
    this.providerSubscriptionService.GetProviderByPhoneNumber(phoneNumber).subscribe(res=>{
      this.spinner.hide();
      this.form.get('providerId').patchValue(res.id);
    },err=>{
      this.spinner.hide();
    })
  }

  getSubscriptionDDL() {
    this.busyLoadingSubscription = true;
    this.subscriptionService.getSubscriptionDDL().subscribe(
      (res: any) => {
        this.busyLoadingSubscription = false;
        this.subscriptionList = res.returnData;
      },
      (err) => {
        console.log(err);
        this.busyLoadingSubscription = false;
      }
    );
  }
  getProviderDDL() {
    this.busyLoadingProvider = true;
    this.providerService.getDropdown().subscribe(
      (res: any[]) => {
        this.busyLoadingProvider = false;
        this.providerList = res;
      },
      (err) => {
        console.log(err);
        this.busyLoadingProvider = false;
      }
    );
  }

  getVendorDDL() {
    this.busyLoadingProvider = true;
    this.vendorService.getDropdown().subscribe(
      (res: any[]) => {
        this.busyLoadingProvider = false;
        this.vendorList = res;
      },
      (err) => {
        console.log(err);
        this.busyLoadingProvider = false;
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
    this.providerSubscriptionService.create(body).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.isSucceeded === false)
          return this.notifier.notify('error', res.errorMessage);
        this.form.reset();
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
  createVendorSubscription() {
    let body = this.vendorForm.value;
    body.vendorId = +body.vendorId
    body.subscriptionId = +body.subscriptionId
    this.spinner.show();
    this.providerSubscriptionService.addVendorDriversSubscription(body).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.isSucceeded === false)
          return this.notifier.notify('error', res.errorMessage);
        this.form.reset();
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
}
