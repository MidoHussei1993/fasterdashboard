import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { CategoryService } from '../../Category/services';
import { ProductList, ProductFilter } from '../models';
import { ProductService } from '../services';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productlist: ProductList[] = [];
  titles: string[] = [
    'product.name',
    'product.name',
    'category.categoryName',
    'category.categoryNameAr',
    'shop.shop_name',
    'shop.shop_name',
    // 'field.CategoryName',
    // 'field.CategoryNameAr',
    'field.priority',
  ];
  properties: string[] = [
    'productName',
    'productNameAr',
    'categoryName',
    'categoryNameAr',
    'shopName',
    'shopNameAr',
    // 'categoryName',
    'sort',
  ];
  filter: ProductFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  currentLanguage: string = '';
  categoryList: Dropdown[] = [];
  active: number = 1;
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  form: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private categoryService: CategoryService,
    private headerService: HeaderService,
    private formBuilder: FormBuilder
  ) {
    // this.form = this.formBuilder.group({
    //   search: ['', [Validators.required]],
    // });
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.products'));
    this.filter = new ProductFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCategoryList();
    this.getProductList(this.filter);
  }

  getCategoryList() {
    this.categoryService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.categoryList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchValue(): void {
    // this.form.markAllAsTouched();
    // if (!this.form.valid) return;
    // this.filter.Product = this.form.get('search').value;
    this.getProductList(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ProductFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }
  resetSearch(): void {
    this.form.reset();
    this.filter.Product = null;
    this.getProductList(this.filter);
  }

  getProductList(filter: ProductFilter) {
    if (this.activatedRoute.snapshot.queryParamMap.get('shopId')) {
      filter.ShopId = +this.activatedRoute.snapshot.queryParamMap.get('shopId');
    }
    this.busyLoading = true;
    this.spinner.show();
    this.productService.getProducts(filter).subscribe(
      (res: List<ProductList>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.productlist = res.data;
        console.log(
          '🚀 ~ file: product-list.component.ts:119 ~ ProductListComponent ~ getProductList ~ res.data.filter(item => item.deliverectMenuId):',
          res.data.filter((item) => item.deliverectMenuId)
        );
        delete res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getProductList(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getProductList(this.filter);
  }
  navigate(product: ProductList, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`product/edit/${product.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`product/view/${product.id}`]);
        break;

      default:
        break;
    }
  }
  navigateTO(product: { event: ProductList; type: string }) {
    switch (product.type) {
      case 'additionalOptions':
        this.navigateToProductAdditionalOption(product.event);
        break;
      case 'productDetails':
        this.navigateToProductDetails(product.event);
        break;
      case 'productAvailability':
        this.navigateProductAvailability(product.event);
        break;
      case 'quickAccess':
        this.router.navigateByUrl(`/product/quick-access/${product.event.id}`);
        break;
      default:
        break;
    }
  }
  navigateProductAvailability(product: ProductList) {
    this.router.navigateByUrl(
      `/product/availability/${product.deliverectMenuId}`
    );
  }

  navigateToProductDetails(product: ProductList) {
    return this.router.navigateByUrl(`/product/${product.id}/details/list`);
  }
  navigateToProductAdditionalOption(product: ProductList) {
    this.router.navigate([`product/additional-options/${product.id}`]);
  }
  changeActivation(index: number) {
    this.spinner.show();
    this.productService
      .changeProductActivation(this.productlist[index].id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getProductList(this.filter);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
}
