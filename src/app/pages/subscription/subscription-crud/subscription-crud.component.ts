import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern } from 'src/app/shared';
import { SubscriptionService } from '../services';

@Component({
  selector: 'app-subscription-crud',
  templateUrl: './subscription-crud.component.html',
  styleUrls: ['./subscription-crud.component.scss']
})
export class SubscriptionCrudComponent implements OnInit {

  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      subscriptionName: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      subscriptionNameAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      subscriptionDescription: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      subscriptionDescriptionAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      isActive: ['', [ Validators.required]],
      subscriptionPrice: ['', [ Validators.required]],
      subscriptionPeriodInDay: ['', [ Validators.required]],
     
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getSubscriptionById();
    }
  }

  getSubscriptionById(){
    this.busyLoading = true;
    this.spinner.show();
    this.subscriptionService.getByID(this.route.snapshot.params.id).subscribe(res => {
      this.spinner.hide();
      this.busyLoading = false;
      this.form.patchValue(res)
    },err => {
    this.spinner.show();
      this.busyLoading = false;
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
    this.subscriptionService.create(body).subscribe(result => {
      this.form.reset();
      this.form.get('id').patchValue(0);
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.created'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}