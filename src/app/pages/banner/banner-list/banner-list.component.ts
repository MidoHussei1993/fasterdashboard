import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ShopService } from '../../shop/services';
import { Banner, BannerFilter } from '../models';
import { BannerService } from '../services';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
})
export class BannerListComponent implements OnInit {
  bannerList: Banner[] = [];
  titles: string[] = [
    'field.Description',
    'field.DescriptionAr',
    'shop.shop',
    'shopTypeId',
  ];
  properties: string[] = [
    'description',
    'descriptionAr',
    'shopName',
    'shopTypeId',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  active: number = 1;
  shopList: Dropdown[] = [];
  currentLanguage: string = '';

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: BannerFilter = new BannerFilter();

  constructor(
    private bannerService: BannerService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private notify: NotifierService,
    private headerService: HeaderService,
    private shopService: ShopService
  ) {
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.banner'));
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getbannerList();
    this.getShopList();
  }
  getShopList() {
    this.shopService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.shopList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  searchValue(): void {
    this.getbannerList();
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new BannerFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getbannerList();
  }
  getbannerList() {
    this.busyLoading = true;
    this.spinner.show();
    this.bannerService.get(this.filter).subscribe(
      (res: List<Banner>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.bannerList = res.data;
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
    this.getbannerList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getbannerList();
  }

  // changeActivation(index: number) {
  //   this.spinner.show();
  //   let body: {BannerId:number, IsActive:boolean} = {
  //     BannerId: this.bannerList[index].id,
  //     IsActive: this.bannerList[index].isActive,
  //   };
  //   this.bannerService
  //     .ChangeBannerActivation(body)
  //     .subscribe(
  //       (res) => {
  //         this.spinner.hide();
  //         console.log(res);
  //       },
  //       (err) => {
  //        this.bannerList[index].isActive = !this.bannerList[index].isActive;
  //         this.spinner.hide();
  //       }
  //     );
  // }

  changeActivation(index: number) {
    console.log(this.bannerList[index].isActive);
    this.spinner.show();
    let body = {
      ...this.bannerList[index],
      isActive: !this.bannerList[index].isActive,
    };
    this.bannerService.ChangeBannerActivation(body).subscribe(
      (res) => {
        this.spinner.hide();
        console.log(res);
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  navigateToEdit(Banner: Banner) {
    this.router.navigateByUrl(`/banner/edit/${Banner.id}`);
  }
  navigateToView(Banner: Banner) {
    this.router.navigateByUrl(`/banner/view/${Banner.id}`);
  }

  deleteBanner(banner: Banner) {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.bannerService.delete(banner.id).subscribe(
          (res) => {
            const deletedIndex = this.bannerList.findIndex(
              (item) => item.id == banner.id
            );
            this.bannerList.splice(deletedIndex, 1);
            this.spinner.hide();
            this.notify.notify(
              'success',
              this.translate.instant('global.deleted')
            );
          },
          (err) => {
            this.spinner.hide();
            this.notify.notify(
              'error',
              this.translate.instant('global.server_error')
            );
            console.log(err);
          }
        );
      }
    });
  }
}
