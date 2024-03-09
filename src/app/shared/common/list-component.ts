import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Filter, List, Pagination } from '../models';

export class ListComponent<ListType, FilterType extends Filter> {
  constructor(
    private mainService: any,
    public notifier: NotifierService,
    public spinner: NgxSpinnerService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  list: ListType[] = [];
  titles: string[] = [];
  properties: string[] = [];
  pagination: Pagination = new Pagination();
  filter: FilterType | any = {
    PageNumber: null,
    PageSize: null,
  };
  navigateTo: string = '';

  searchValue(): void {
    this.getList();
  }

  //   resetfilter() {
  //     let pagePagination = {
  //       PageNumber: this.filter.PageNumber,
  //       PageSize: this.filter.PageSize,
  //     };
  //     this.filter = new FilterType;
  //     this.filter.PageNumber = pagePagination.PageNumber;
  //     this.filter.PageSize = pagePagination.PageSize;
  //     this.getList();
  //   }

  getList(cb?: Function) {
    console.log('get list of items');
    this.spinner.show();
    this.mainService.get(this.filter).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (cb && typeof cb == 'function') {
          cb(res);
        } else {
          this.list = res.data;
          delete res.data;
          this.pagination = res;
        }
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getList();
  }

  navigateToEdit(event) {
    if (!this.navigateTo.length) return;
    this.router.navigateByUrl(`/${this.navigateTo}/edit/${event.id}`);
  }
  navigateToView(event) {
    if (!this.navigateTo.length) return;
    this.router.navigateByUrl(`/${this.navigateTo}/view/${event.id}`);
  }

  deleteItem(item) {
    this.spinner.show();
    this.mainService.delete(item.id).subscribe(
      (res: any) => {
        this.getList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
