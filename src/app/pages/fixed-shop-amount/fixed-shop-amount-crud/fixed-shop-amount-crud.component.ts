import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern, FormMode } from 'src/app/shared';
import { FixedShopAmountService } from '../services/fixed-shop-amount.service';

@Component({
  selector: 'app-fixed-shop-amount-crud',
  templateUrl: './fixed-shop-amount-crud.component.html',
  styleUrls: ['./fixed-shop-amount-crud.component.scss']
})
export class FixedShopAmountCrudComponent extends Crud implements OnInit {
  additionalOptionList = []
  constructor(
    private fixedShopAmountService: FixedShopAmountService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
  ) { 
    super(fixedShopAmountService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      id: [0],
      fromOrderAmount: ['', [ Validators.required]], 
      toOrderAmount: ['', [ Validators.required]], 
      fixedAmount: ['', [ Validators.required]], 
      shopId: [null, [ Validators.required]], 

    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.form.get('shopId').patchValue(+this.route.snapshot.params.shopId);
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getById(this.route.snapshot.params.id)
    }
  }

  create() {
    let body = this.form.value;
    this.spinner.show();
    this.mainService.create(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('created'))
      this.form.reset();
      this.form.get('id').patchValue(0);
      this.form.get('shopId').patchValue(+this.route.snapshot.params.shopId);
    },err=>{
      this.spinner.hide();
    })
  }


}