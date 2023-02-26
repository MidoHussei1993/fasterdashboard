import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, Pattern } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { CategoryService } from '../../Category/services';
import { ShopService } from '../../shop/services';
import { Product } from '../models';
import { ProductService } from '../services';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss'],
})
export class ProductCrudComponent implements OnInit {
  @ViewChild('imgViewer', { static: false }) imgViewer: ImgViewerComponent;

  mode: FormMode;
  product: Product;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  ProductId: number = null;
  shopList: Dropdown[] = [];
  busyLoadingShop: boolean = false;
  categoryList: Dropdown[] = [];
  busyLoadingCategory: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private shopService: ShopService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      productName: [
        '',
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      productNameAr: [
        '',
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      imagePath: ['', [Validators.required]],
      isOffer: ['', [Validators.required]],
      shopId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      sort: [0],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getShopList();
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.product = new Product();
      this.ProductId = this.route.snapshot.params.id;
      this.getProductById(this.ProductId);
      this.productService
        .getProductDetailsByProductId(this.ProductId)
        .subscribe((result) => {
          console.log(result);
        });
    }
  }
  viewImage() {
    this.imgViewer.openBackDropCustomClass();
  }

  getProductById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.productService.getProductByID(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.product = new Product();
        this.product = res;
        this.busyLoading = false;
        this.form.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }

  getCategoryList() {
    this.busyLoadingCategory = true;
    this.categoryService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.busyLoadingCategory = false;
        this.categoryList = res;
      },
      (err) => {
        console.log(err);
        this.busyLoadingCategory = false;
      }
    );
  }

  getShopList() {
    this.busyLoadingShop = true;
    this.shopService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.busyLoadingShop = false;
        this.shopList = res;
      },
      (err) => {
        console.log(err);
        this.busyLoadingShop = false;
      }
    );
  }

  async handleInputChange(event) {
    const file = event.target.files[0];
    this.productService.uploadProductImage(file).subscribe((res) => {
      this.form.get('imagePath').patchValue(res.returnData.response);
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    console.log(this.form);
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.productService.createProduect(body).subscribe(
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
  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.productService.updateProduct(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.edited')
        );
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
}
