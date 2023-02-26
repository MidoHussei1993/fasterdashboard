import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ProductService } from '../../services';
import { ProductDetailsSizeList } from '../models';
import { ProductDetailsSizeService } from '../services';

@Component({
  selector: 'app-product-details-size-list',
  templateUrl: './product-details-size-list.component.html',
  styleUrls: ['./product-details-size-list.component.scss']
})
export class ProductDetailsSizeListComponent implements OnInit {

  productDetailsSizeList: ProductDetailsSizeList[] = [];
  titles: string[] = [
    'field.itemSizeName',
    'field.itemSizeName',
    'field.lastPrice',
    'field.price',
  ];
  properties: string[] = ['itemSizeNameEn', 'itemSizeNameAr', 'lastPrice', 'price'];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode; 
  }
  constructor(
    private productDetailsSizeService: ProductDetailsSizeService,
    private router: Router,
    private swalService: SwalModalService,
    private spinner:NgxSpinnerService ,
    private activatedRoute:ActivatedRoute ,
    private productService: ProductService ,
  ) 
  {}

  ngOnInit(): void {
  
    this.getProductDetailsSizeList()
  }

  getProductDetailsSizeList(){
    this.busyLoading = true;
    this.spinner.show();
    this.productDetailsSizeService.get(this.activatedRoute.snapshot.params.detailsId).subscribe((res:any) =>{
      this.spinner.hide();
      this.busyLoading = false;
      this.productDetailsSizeList = res;
    }, err =>{
      this.spinner.hide();
      console.log(err);
      this.busyLoading = false;
    })
  }
  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.productService
      .ChangeProductDetailsSizeActivation(this.productDetailsSizeList[index].id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getProductDetailsSizeList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }


  navigateToEdit(productDetailsSizeList:ProductDetailsSizeList){
    this.router.navigate([`product/size-details/${this.activatedRoute.snapshot.params.detailsId}/edit/${productDetailsSizeList.id}`]);
  }

  navigateToView(productDetailsSizeList:ProductDetailsSizeList){
    this.router.navigate([`product/size-details/${this.activatedRoute.snapshot.params.detailsId}/view/${productDetailsSizeList.id}`]);
  }

  navigateToCreate(){
    this.router.navigate([`product/size-details/${this.activatedRoute.snapshot.params.detailsId}/create`]);
  }
}
