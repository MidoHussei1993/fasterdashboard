import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ProductBranch, ProductBranchFilter } from '../models';
import { ProductBranchService } from '../services/product-branch.service';

@Component({
  selector: 'app-product-branch-list',
  templateUrl: './product-branch-list.component.html',
  styleUrls: ['./product-branch-list.component.scss']
})
export class ProductBranchListComponent implements OnInit {
  productBranchList: any[] = [];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  titles: string[] = [
    'product.name',
    'product.name',
    'shop_branch.description_Location',
  ];
  properties: string[] = [
    'productName',
    'productNameAr',
    'descriptionLocation',
  ];
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: ProductBranchFilter = new ProductBranchFilter();

  constructor(
    private productBranchService: ProductBranchService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getProductBranchList();
  }

  searchValue(): void {
    this.getProductBranchList();
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ProductBranchFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getProductBranchList();
  }

  getProductBranchList() {
    if(this.activatedRoute.snapshot.queryParamMap.get('ShopBranchId')){
      this.filter.ShopBranchId = this.activatedRoute.snapshot.queryParamMap.get('ShopBranchId')
    }
    this.busyLoading = true;
    this.spinner.show();
    this.productBranchService.get(this.filter).subscribe(
      (res: List<ProductBranch>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.productBranchList = res.data;
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

  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getProductBranchList(); 
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getProductBranchList();
  }

  changeActivation(index: number) {
    console.log(this.productBranchList[index].isActive);
    this.spinner.show();
    let body: {id:number, isActive:boolean} = {
      id: this.productBranchList[index].id,
      isActive: this.productBranchList[index].isActive,
    };
    this.productBranchService
      .ChangeActivationById(body)
      .subscribe(
        (res) => {
          this.spinner.hide();
          console.log(res);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

}
