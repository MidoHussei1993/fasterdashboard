import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { BundlesOfferService, Dropdown, FormMode, Pattern } from 'src/app/shared';
import { BundleProductService, ProductService } from '../services';

@Component({
  selector: 'app-bundle-product',
  templateUrl: './bundle-product.component.html',
  styleUrls: ['./bundle-product.component.scss']
})
export class BundleProductComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  bundlesOfferList: Dropdown[] = [];
  busyLoadingBundlesOffer: boolean = false;
  productDetailsList: Dropdown[] = [];
  busyLoadingProductDetails: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bundleProductService: BundleProductService,
    private bundlesOfferService: BundlesOfferService,
    private productService: ProductService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      isActive: ['', [ Validators.required]],
      productDetailsId: ['', [ Validators.required]],
      bundlesOfferId: ['', [ Validators.required]],
     
    });
  }

  ngOnInit(): void {
    this.getBundlesOfferList();
    this.getProductDetails();
  }
  getBundlesOfferList(){
    this.busyLoadingBundlesOffer = true;
    this.bundlesOfferService.getDropdown().subscribe((res:Dropdown[]) =>{
      this.busyLoadingBundlesOffer = false;
      this.bundlesOfferList = res
    }, err =>{
      console.log(err);
      this.busyLoadingBundlesOffer = false;
    })
  }
  getProductDetails(){
    this.busyLoadingProductDetails = true;
    this.productService.GetDetailsDDL().subscribe((res:Dropdown[]) =>{
      this.busyLoadingProductDetails = false;
      this.productDetailsList = res
    }, err =>{
      console.log(err);
      this.busyLoadingProductDetails = false;
    })
  }
  create() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    let body = this.form.value;
    this.spinner.show();
    this.bundleProductService.create(body).subscribe(result => {
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