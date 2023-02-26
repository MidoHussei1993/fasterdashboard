import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  mode: FormMode;
  pricesForm: FormGroup;
  socialMediaForm: FormGroup;
  termPoliciesForm: FormGroup;
  versionForm: FormGroup;
  schedulingform: FormGroup;
  vatForm: FormGroup;
  radiusForm: FormGroup;
  bonusForm: FormGroup;
  providerReciveOneOrder: FormGroup;
  LimitationOrderValue: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private settingService: SettingService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.pricesForm = this.formBuilder.group({
      id: [0],
      kmPrice: ['', [Validators.required]],
      counterPrice: ['', [Validators.required]],
      transportKMPrice: ['', [Validators.required]],
      transportCounterPrice: ['', [Validators.required]],
      deliveryRangePrice: ['', [Validators.min(4),Validators.required]],
      transportRangePrice: ['', [Validators.min(4),Validators.required]],
      deliveryCancelFee: ['', [Validators.required]],
      transportCancelFee: ['', [Validators.required]],
    });
    this.socialMediaForm = this.formBuilder.group({
      id: [0],
      twitter: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      email: ['', [Validators.required]],
      snap: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      deliveryTrainingLink: ['', [Validators.required]],
      deliveryTrainingLinkAr: ['', [Validators.required]],
      transportTrainingLink: ['', [Validators.required]],
      transportTrainingLinkAr: ['', [Validators.required]],
    });
    this.termPoliciesForm = this.formBuilder.group({
      id: [0],
      termsAndPolicies: ['', [Validators.required]],
      about: ['', [Validators.required]],
    });
    this.versionForm = this.formBuilder.group({
      id: [0],
      version: ['', [Validators.required]],
      versionIos: ['', [Validators.required]],
      versionShop: ['', [Validators.required]],
    });
    this.vatForm = this.formBuilder.group({
      id: [0],
      vat: ['', [Validators.required]],
    });
    this.radiusForm = this.formBuilder.group({
      id: [0],
      deliveryRadius: ['', [Validators.required]],
      transportRadius: ['', [Validators.required]],
      distanceShopSearch: ['', [Validators.required]],
    });
    this.schedulingform = this.formBuilder.group({
      id: [0],
      schedulingInMinutes: ['', [Validators.required]],
    });
    this.bonusForm = this.formBuilder.group({
      id: [0],
      providerRegistrationBonus: ['', [Validators.required]],
      customerRegistrationBonus: ['', [Validators.required]],
      // providerOrderBonus: ['', [Validators.required]],
    });
    this.providerReciveOneOrder = this.formBuilder.group({
      id: [0],
      isProviderReciveOneOrder: ['', [Validators.required]],
    });

    this.LimitationOrderValue = this.formBuilder.group({
      id: [0],
      minimumCashOrderValue: [''],
      minimumCreditOrderValue: [''],
      maximumCashOrderValue: [''],
      maximumCreditOrderValue: [''],
    });


    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.GetPrices();
    this.GetSocialMedia();
    this.GetTermsAndPolicies();
    this.GetVersion();
    this.GetRadius();
    this.GetVat();
    this.GetSchedulingInMinutes();
    this.GetBonusData();
    this.getProviderReciveOneOrder();
    this.getLimitationOrderValue();
  }

  GetPrices() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.GetPrices().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.pricesForm.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdatePrices() {
    if(!this.pricesForm.valid) return;
    let body = this.pricesForm.value;
    this.spinner.show();
    this.settingService.UpdatePrices(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }
  // -------------------------------------------------
  GetSocialMedia() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.GetSocialMedia().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.socialMediaForm.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdateSocialMedia() {
    if(!this.socialMediaForm.valid) return;
    let body = this.socialMediaForm.value;
    this.spinner.show();
    this.settingService.UpdateSocialMedia(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }
  // ---------------------------------
  GetTermsAndPolicies() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.GetTermsAndPolicies().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.termPoliciesForm.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdateTermsAndPolicies() {
    if(!this.termPoliciesForm.valid) return;
    let body = this.termPoliciesForm.value;
    this.spinner.show();
    this.settingService.UpdateTermsAndPolicies(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }
  // ---------------------------------------------
  GetVersion() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.GetVersion().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.versionForm.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdateVersion() {
    if(!this.versionForm.valid) return;
    let body = this.versionForm.value;
    this.spinner.show();
    this.settingService.UpdateVersion(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }
  //----------------Radius----------------------------
  GetRadius() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.GetRadius().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.radiusForm.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdateRadius() {
    if(!this.radiusForm.valid) return;
    let body = this.radiusForm.value;
    this.spinner.show();
    this.settingService.UpdateRadius(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }

  //----------------Vat----------------------------
  GetVat() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.GetVat().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.vatForm.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdateVat() {
    if(!this.vatForm.valid) return;
    let body = this.vatForm.value;
    this.spinner.show();
    this.settingService.UpdateVat(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }
  //----------------Vat----------------------------
  GetSchedulingInMinutes() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.GetSchedulingInMinutes().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.schedulingform.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdateSchedulingInMinutes() {
    if(!this.schedulingform.valid) return;
    let body = this.schedulingform.value;
    this.spinner.show();
    this.settingService.UpdateSchedulingInMinutes(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }
   //----------------Bonus----------------------------
   GetBonusData() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.GetBonusData().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.bonusForm.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdateBonusData() {
    if(!this.bonusForm.valid) return;
    let body = this.bonusForm.value;
    this.spinner.show();
    this.settingService.UpdateBonusData(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }
  //----------------Bonus----------------------------
  getProviderReciveOneOrder() {
    this.busyLoading = true;
    this.spinner.show();
    this.settingService.getProviderReciveOneOrder().subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.providerReciveOneOrder.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  UpdateProviderReciveOneOrder() {
    if(!this.providerReciveOneOrder.valid) return;
    let body = this.providerReciveOneOrder.value;
    this.spinner.show();
    this.settingService.UpdateProviderReciveOneOrder(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }

    //----------------Bonus----------------------------
    getLimitationOrderValue() {
      this.busyLoading = true;
      this.spinner.show();
      this.settingService.getLimitationOrderValue().subscribe(
        (res) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.LimitationOrderValue.patchValue(res);
        },
        (err) => {
          this.spinner.show();
          this.busyLoading = false;
        }
      );
    }
    updateLimitationOrderValue() {
      if(!this.LimitationOrderValue.valid) return;
      let body = this.LimitationOrderValue.value;
      this.spinner.show();
      this.settingService.updateLimitationOrderValue(body).subscribe(result => {
        this.spinner.hide();
        this.notifier.notify('success',this.translate.instant('global.edited'))
      },err=>{
        this.spinner.hide();
        this.notifier.notify('error',err)
      })
    }
}
