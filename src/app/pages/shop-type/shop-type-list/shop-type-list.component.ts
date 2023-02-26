import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List } from 'src/app/shared';
import { Roles } from 'src/app/shared/models/roles.model';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ShopType, ShopTypeFilter } from '../models';
import { ShopTypeService } from '../services';
import jwt_decode from "jwt-decode";
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-shop-type-list',
  templateUrl: './shop-type-list.component.html',
  styleUrls: ['./shop-type-list.component.scss']
})
export class ShopTypeListComponent implements OnInit {
  shoplist: ShopType[] = [];
  titles: string[] = [
    'field.name',
    'field.name',
    'field.color',
  ];
  properties: string[] = [
    'type',
    'typeAr',
    'color',
  ];
  filter: ShopTypeFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
// roles
  roleAdmin:"admin";
  roles:Roles = new Roles();
  admin:boolean;
  busyDeleteing: boolean = true;

  constructor(
    private shopTypeService: ShopTypeService,
    private router: Router,
    private swalService: SwalModalService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private notify: NotifierService,
  ) {}

  ngOnInit(): void {
    this.filter = new ShopTypeFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getShopList(this.filter);
    let token = localStorage.getItem('token');
    this.roles = jwt_decode(token);

    if (this.roles.roles == this.roleAdmin){
      this.admin == true;

    }else{
      this.admin == false;

    }
  }

  searchValue(): void {
    this.getShopList(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ShopTypeFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getShopList(this.filter);
  }

  getShopList(filter: ShopTypeFilter) {
    this.busyLoading = true;
    this.spinner.show();
    this.shopTypeService.get(filter).subscribe(
      (res: List<ShopType>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.shoplist = res.data;
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
  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.shopTypeService.ChangeActivation(String(this.shoplist[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getShopList(this.filter);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getShopList(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getShopList(this.filter);
  }
  navigate(shop: ShopType, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`shop-type/edit/${shop.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`shop-type/view/${shop.id}`]);
        break;
        case this.formMode.Delete:
          this.swalService.deleteConfirmation().then((res) => {
            if (res) {
              this.busyDeleteing = true;
              this.shopTypeService
                .delete(shop.id)
                .subscribe(
                  (res) => {
                    const deletedIndex = this.shoplist.findIndex(
                      (item) => item.id == shop.id
                    );
                    this.shoplist.splice(deletedIndex, 1);
                    this.notify.notify(
                      'success',
                      this.translate.instant('global.deleted')
                    );
                  },
                  (err) => {
                    this.notify.notify(
                      'error',
                      this.translate.instant('global.server_error')
                    );
                    console.log(err);
                  }
                );
            }
          });
          break;

      default:
        break;
    }
  }
}
