import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Bundle } from 'typescript';
import { BundleOfferFilter, BundlesOffer } from '../models';
import { BundleOfferService } from '../services';

@Component({
  selector: 'app-BundlesOffer-list',
  templateUrl: './BundlesOffer-list.component.html',
  styleUrls: ['./BundlesOffer-list.component.scss']
})
export class BundleListComponent implements OnInit {

  BundlesOfferlist: BundlesOffer[] = [];
  titles:string[] = [
    'Bundle Name English',
    'Bundle Name Arabic',
    'Description Arabic',
    'Description English',
    'Discount Percentage',
    'Expiry Date',


  ];
  properties:string[] = [
    "bundleName",
    "bundleNameAr",
    "description",
    "descriptionAr",
  "discountPercentage" ,
  'expiryDate',

  ];


  filter:BundleOfferFilter;
  busyLoading:boolean = true;
  pagination:Pagination = new Pagination();
  activeTab:string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private bundleService: BundleOfferService,
    private router: Router,
    private swalService: SwalModalService,
    private spinner: NgxSpinnerService
  ) {
   }

  ngOnInit(): void {
    this.filter = new BundleOfferFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getListBubdle(this.filter);
  }
  searchValue(): void {
    this.getListBubdle(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new BundleOfferFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }
  getListBubdle(filter:BundleOfferFilter){
    this.busyLoading = true;
    this.bundleService.get(filter).subscribe((res:List<BundlesOffer>) =>{
      this.busyLoading = false;
      this.BundlesOfferlist = res.data;
      delete res.data;
      this.pagination = {...res}
    }, err =>{
      console.log(err);
      this.busyLoading = false;
    })
  }
  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.bundleService.ChangeActivation(String(this.BundlesOfferlist[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getListBubdle(this.filter);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }


  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getListBubdle(this.filter);
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getListBubdle(this.filter);
  }
  
  navigate(bundle:BundlesOffer,type:FormMode){
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`bundle/edit/${bundle.id}`]);
        break;
        case this.formMode.View:
          this.router.navigate([`bundle/view/${bundle.id}`]);
        break;

      default:
        break;
    }
  }
}
