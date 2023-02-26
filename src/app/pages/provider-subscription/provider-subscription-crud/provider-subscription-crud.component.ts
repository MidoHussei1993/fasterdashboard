import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, Pattern } from 'src/app/shared';
import { VendorService } from '../../vendor/services/vendor.service';
import { ProviderSubscription } from '../models';
import { ProviderSubscriptionService } from '../services';

@Component({
  selector: 'app-provider-subscription-crud',
  templateUrl: './provider-subscription-crud.component.html',
  styleUrls: ['./provider-subscription-crud.component.scss']
})
export class ProviderSubscriptionCrudComponent implements OnInit {

  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  ProductId: number = null;
  providerList: Dropdown[] = [];
  busyLoadingProvider: boolean = false;
  subscriptionList: Dropdown[] = [];
  busyLoadingSubscription: boolean = false; //
  mainObject: ProviderSubscription = new ProviderSubscription();

  constructor(
    private providerSubscriptionService : ProviderSubscriptionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private spinner: NgxSpinnerService ,
    private notifier: NotifierService,
  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      subscriptionName: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      subscriptionNameAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      subscriptionDescription: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      subscriptionDescriptionAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      subscriptionPrice: ['', [ Validators.required]],
      subscriptionPeriodInDay: ['', [ Validators.required]],
      // isActive: ['', [ Validators.required]],     
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getPorviderSubscriptionById();
  }

  getPorviderSubscriptionById(){
    this.busyLoading = true;
    this.spinner.show();
    this.providerSubscriptionService.getDriversSubscription(this.route.snapshot.params.id).subscribe((porviderSubscription:any) => {
      this.spinner.hide();
      this.busyLoading = false;
      this.form.patchValue(porviderSubscription);
      this.mainObject = porviderSubscription;
    },err => {
      this.busyLoading = false;
      this.spinner.hide();
    })
  }


  submit() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    console.log(this.form)
    if (this.mode === FormMode.Create) {
      this.create();
    
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.providerSubscriptionService.create(body).subscribe(result => {
      this.form.reset();
      this.form.get('id').patchValue(0);
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.created'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
  // edit() {
  //   let body = this.form.value;
  //   this.spinner.show();
  //   this.bannerService.update(body).subscribe(result => {
  //     this.spinner.hide();
  //     this.notifier.notify('success',this.translate.instant('global.edited'))
  //   },err=>{
  //     this.spinner.hide();
  //     // this.notifier.notify('error',err)
  //   })
  // }
}
