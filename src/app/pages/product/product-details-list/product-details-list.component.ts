import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ShopBranch } from '../../shop-branch/models';
import { ProductDetails } from '../models';
import { ProductService } from '../services';

@Component({
  selector: 'app-product-details-list',
  templateUrl: './product-details-list.component.html',
  styleUrls: ['./product-details-list.component.scss'],
})
export class ProductDetailsListComponent implements OnInit {
  productDetailslist: ProductDetails[] = [];
  titles: string[] = [
    'field.title',
    'field.title',
    'field.price',
    'field.availableFromHour',
    'field.availableToHour',
    'field.activation',
  ];
  properties: string[] = [
    'title',
     'titleAr',
      'price',
      'availableFromHour',
      'availableToHour',
    ];
  busyLoading: boolean = true;
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private productService: ProductService,
    private router: Router,
    private swalService: SwalModalService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private notifier: NotifierService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getShopList();
  }

  getShopList() {
    this.busyLoading = true;
    this.spinner.show();
    this.productService
      .getProductDetailsByProductId(
        this.activatedRoute.snapshot.params.productId
      )
      .subscribe(
        (res: ProductDetails[]) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.productDetailslist = res;
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
          this.busyLoading = false;
        }
      );
  }
  navigateToCreate() {
    this.router.navigateByUrl(
      `/product/${this.activatedRoute.snapshot.params.productId}/details/create`
    );
  }
  navigateToView(productDetails: ProductDetails) {
    this.router.navigateByUrl(
      `/product/${this.activatedRoute.snapshot.params.productId}/details/view/${productDetails.id}`
    );
  }
  navigateToEdit(productDetails: ProductDetails) {
    this.router.navigateByUrl(
      `/product/${this.activatedRoute.snapshot.params.productId}/details/edit/${productDetails.id}`
    );
  }
  navigateToProductDetailsSize(productDetails: ProductDetails) {
    this.router.navigateByUrl(`/product/size-details/${productDetails.id}`);
  }
  navigateToProductComponents(productDetails: ProductDetails) {
    this.router.navigateByUrl(`/product/components/${productDetails.id}`);
  }
  navigateToAdditionalComponentTitle(productDetails: ProductDetails) {
    this.router.navigateByUrl(
      `/additional-component-title?productDetailsId=${productDetails.id}`
    );
  }
  changeActivation(index: number) {
    this.spinner.show();
    this.productService
      .changeProductDetailsActivation(this.productDetailslist[index].id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.notifier.notify(
            'success',
            this.translate.instant('global.edited')
          );
          this.getShopList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
}
