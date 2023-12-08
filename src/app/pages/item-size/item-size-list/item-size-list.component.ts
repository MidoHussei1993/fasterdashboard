import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ItemSize } from '../models';
import { ItemSizeFilter } from '../models/item-size-filter.model';
import { ItemSizeService } from '../services/item-size.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-size-list',
  templateUrl: './item-size-list.component.html',
  styleUrls: ['./item-size-list.component.scss'],
})
export class ItemSizeListComponent implements OnInit {
  itemSizeList: ItemSize[] = [];
  titles: string[] = ['shop.sizeName', 'shop.sizeName'];
  properties: string[] = ['sizeName', 'sizeNameAr'];
  filter: ItemSizeFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private itemSizeService: ItemSizeService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.itemSize'));
    this.filter = new ItemSizeFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getItemSizeList(this.filter);
  }

  searchValue(): void {
    this.getItemSizeList(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ItemSizeFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getItemSizeList(this.filter);
  }

  getItemSizeList(filter: ItemSizeFilter) {
    this.busyLoading = true;
    this.spinner.show();
    this.itemSizeService.get(filter).subscribe(
      (res: List<ItemSize>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.itemSizeList = res.data;
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
    this.getItemSizeList(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getItemSizeList(this.filter);
  }
  navigate(shop: ItemSize, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`item-size/edit/${shop.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`item-size/view/${shop.id}`]);
        break;

      default:
        break;
    }
  }
}
