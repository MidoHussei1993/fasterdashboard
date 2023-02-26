import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, FormMode, ListComponent } from 'src/app/shared';
import { ShopBranchService } from '../../shop-branch/services';
import { ShopBranchWalletService } from '../services/shop-branch-wallet.service';

@Component({
  selector: 'app-shop-branch-wallet-crud',
  templateUrl: './shop-branch-wallet-crud.component.html',
  styleUrls: ['./shop-branch-wallet-crud.component.scss']
})
export class ShopBranchWalletCrudComponent extends Crud implements OnInit , OnChanges {

  @Input() shopBranchId: number

  currentWalletAmount:number;
  constructor(
    private shopBranchWalletService: ShopBranchWalletService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) { 
    super(shopBranchWalletService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      id: [0],
      shopBranchId: ['', [ Validators.required]],     
      amount: ['', [ Validators.required]],     
      type: ['', [ Validators.required]],     
      note: ['', [ Validators.required]],     
      deliveryOrderId: ['', [ Validators.required]],     
      walletActionType: [1, [ Validators.required]],     
      actionUserId: [localStorage.getItem('token'), [ Validators.required]],     
      isApprovedByAdmin: [true, [ Validators.required]],     
      paymentId: [''],     
      moneyTransferImage: ['', ],     
    });

  }
  ngOnChanges(): void {
    this.form.get('shopBranchId').patchValue(this.shopBranchId)
    this.getCurrentWalletAmount(this.shopBranchId);
  }

  getCurrentWalletAmount(id){
    this.shopBranchWalletService.GetShopBranchWalletSum(id).subscribe(result => {
      this.currentWalletAmount = result
    })
  }
  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.getCurrentWalletAmount(this.route.snapshot.params.id)
      this.form.get('shopBranchId').patchValue(this.route.snapshot.params.id)
    }
    this.mode = FormMode.Create
  }

}
