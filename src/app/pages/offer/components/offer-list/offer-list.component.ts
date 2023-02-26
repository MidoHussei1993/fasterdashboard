import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { offerDto } from '../../model/offerDto';
import { Dropdown, FormMode, List, Pagination } from 'src/app/shared';
import { OfferFilter } from '../../model/offerFilter';
import { OfferService } from '../../services';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { OfferList } from '../../model/offerList.model';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {

  offerlist: OfferList[] = [];
  offerlistDeleted:Dropdown[] = [];
  titles:string[] = [
    'Description Arabic',
    'Description English',
    "product Name English" ,
    "productName Arabic",
    'Expiry Date',

  ];
  properties:string[] = [
    "description",
    "descriptionAr",
    "productName" ,
    "productNameAr",
     "expiryAt",

  ];


  filter:OfferFilter;
  busyLoading:boolean = true;
  pagination:Pagination = new Pagination();
  activeTab:string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private offerService: OfferService,
    private router: Router,
    private swalService: SwalModalService,
  ) {
   }

  ngOnInit(): void {
    this.filter = new OfferFilter();
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
    this.filter = new OfferFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }
  getListBubdle(filter:OfferFilter){
    this.busyLoading = true;
    this.offerService.get(filter).subscribe((res:List<OfferList>) =>{
      this.busyLoading = false;
      this.offerlist = res.data;
      delete res.data;
      this.pagination = {...res}
    }, err =>{
      console.log(err);
      this.busyLoading = false;
    })
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
  deleteItem(item:OfferList){
    this.swalService
    .showDeleteConfirmation(item.id)
    .then((result) => {

    }).catch((err) => {

    });
  }
  navigate(bundle:OfferList,type:FormMode){
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`offer/edit/${bundle.id}`]);
        break;
        case this.formMode.View:
          this.router.navigate([`offer/view/${bundle.id}`]);
        break;

      default:
        break;
    }
  }
}
