import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern, FormMode } from 'src/app/shared';
import { clean } from 'src/app/util';
import { FasterWalletService } from '../services/faster-wallet.service';

@Component({
  selector: 'app-faster-wallet-crud',
  templateUrl: './faster-wallet-crud.component.html',
  styleUrls: ['./faster-wallet-crud.component.scss']
})
export class FasterWalletCrudComponent extends Crud implements OnInit {
  walletActionType:{id:number,name:string}[] = [
    {id:1,name:'ADMIN'},
    {id:2,name:'ORDER'},
    {id:3,name:'PROVIDER'},
    {id:4,name:'CUSTOMER_ARREARS'},
    {id:5,name:'COBONE_VALUE'},
    {id:6,name:'DELIVERY_VAT'},
    {id:7,name:'DELEVRY_AMOUNT'},
    {id:8,name:'RegisterBonus'},
    {id:11,name:'OrderBonus'},
    {id:9,name:'Motivation'},
    {id:10,name:'CUSTOMER_ARREARS_NEGATIVE'},
    {id:11,name:'ProviderSalary'},
  ];
  constructor(
    private fasterWalletService: FasterWalletService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) { 
    super(fasterWalletService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      id: [0],
      amount: ['', [ Validators.required]],
      type: ['', [ Validators.required]],
      note: ['', [ Validators.required]],
      walletActionType: [null],
      transportOrderId: [null],
      deliveryOrderId: [null],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getById(this.route.snapshot.params.id)
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.mainService.create(clean(body)).subscribe(result => {
      this.spinner.hide();
      this.form.reset();
      this.form.get('id').patchValue(0);
      this.notifier.notify('success',this.translate.instant('created'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }

}