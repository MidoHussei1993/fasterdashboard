import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { shareReplay, take } from 'rxjs/operators';
import { Dropdown, FormMode, Pattern } from 'src/app/shared';
import { ProductService } from '../../product/services';
import { ShopBranchService } from '../../shop-branch/services';
import { ShopService } from '../../shop/services';
import { ProductBranchService } from '../services/product-branch.service';

@Component({
  selector: 'app-product-branch-crud',
  templateUrl: './product-branch-crud.component.html',
  styleUrls: ['./product-branch-crud.component.scss'],
})
export class ProductBranchCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  shopBranchList: any[] = [];
  busyLoadingShopBranch: boolean = false;
  productList: any[] = [];
  busyLoadingProduct: boolean = false;
  shoptList: Dropdown[] = [];
  busyLoadingshop: boolean = false;
  shopId = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productBranchService: ProductBranchService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private shopService: ShopService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      isActive: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      shopBranchId: ['', [Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getShopList();
    if (this.route.snapshot.queryParams.shopId) {
      this.shopId = +this.route.snapshot.queryParams.shopId;
      this.getDropDowns(+this.route.snapshot.queryParams.shopId);
    }
    if (this.route.snapshot.queryParams.ShopBranchId) {
      this.form
        .get('shopBranchId')
        .patchValue(+this.route.snapshot.queryParams.ShopBranchId);
    }
  }
  getShopList() {
    this.busyLoadingshop = true;
    this.shopService.getDropdown().subscribe(
      (res: any) => {
        this.busyLoadingshop = false;
        this.shoptList = res;
      },
      (err) => {
        console.log(err);
        this.busyLoadingshop = false;
      }
    );
  }

  getDropDowns(id) {
    this.getShopBranchList(id);
    this.getProductsDDLByShopId(id);
  }
  getShopBranchList(shopId) {
    // console.log(id)
    this.shopBranchList = [];
    this.busyLoadingShopBranch = true;
    this.productBranchService.getShopBranchDDL(shopId).subscribe(
      (res: any) => {
        this.busyLoadingShopBranch = false;
        this.shopBranchList = res.returnData;
      },
      (err) => {
        console.log(err);
        this.busyLoadingShopBranch = false;
      }
    );
  }
  getProductsDDLByShopId(shopId) {
    this.productList = [];
    this.busyLoadingProduct = true;
    this.productService.getProductsDDLByShopId(shopId).subscribe(
      (res: Dropdown[]) => {
        this.busyLoadingProduct = false;
        this.productList = res;
      },
      (err) => {
        console.log(err);
        this.busyLoadingProduct = false;
      }
    );
  }

  // getProductBranchById(){
  //   this.busyLoading = true;
  //   this.spinner.show();
  //   this.productBranchService.getByID(this.route.snapshot.params.id).subscribe(res => {
  //     this.spinner.hide();
  //     this.busyLoading = false;
  //     this.form.patchValue(res)
  //   },err => {
  //   this.spinner.show();
  //     this.busyLoading = false;
  //   })
  // }

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
    this.productBranchService.create(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.spinner.hide();
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
