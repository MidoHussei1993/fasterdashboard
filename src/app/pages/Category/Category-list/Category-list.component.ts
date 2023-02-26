import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown, FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Category, CategoryFilter } from '../models';
import { CategoryService } from '../services';

@Component({
  selector: 'app-Category-list',
  templateUrl: './Category-list.component.html',
  styleUrls: ['./Category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  Categorylist: Category[] = [];
  CategorylistDeleted:Dropdown[] = [];
  titles:string[] = [
    'menu.category',
    'menu.category',
    // 'category Image',

  ];
  properties:string[] = [
    'categoryName',
    'categoryNameAr',
    // 'categoryImage',

  ];
  filter:CategoryFilter;
  busyLoading:boolean = true;
  pagination:Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private swalService: SwalModalService,
  ) {
   }

  ngOnInit(): void {
    this.filter = new CategoryFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getShopList(this.filter);
  }

  searchValue(): void {
    this.getShopList(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CategoryFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }

  getShopList(filter:CategoryFilter){
    this.busyLoading = true;
    this.categoryService.get(filter).subscribe((res:List<Category>) =>{
      this.busyLoading = false;
      this.Categorylist = res.data;
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
    this.getShopList(this.filter);
  }

  setPageNumber(pageNumber:any){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getShopList(this.filter);
  }
  deleteItem(item:Category){
    this.swalService
    .showDeleteConfirmation(item.id)
    .then((result) => {

    }).catch((err) => {

    });
  }
  navigate(category:Category,type:FormMode){
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`category/edit/${category.id}`]);
        break;
        case this.formMode.View:
          this.router.navigate([`category/view/${category.id}`]);
        break;

      default:
        break;
    }
  }
}
