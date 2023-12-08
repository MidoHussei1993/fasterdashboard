import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ShopBranch, ShopBranchFilter } from '../models';
import { ShopBranchService } from '../services';
import jwt_decode from 'jwt-decode';
import { Roles } from 'src/app/shared/models/roles.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '../../identity/services/identity.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { IActionLTable, Marker } from 'src/app/shared/components';
import { ShopBranchWalletService } from '../../wallet/services/shop-branch-wallet.service';
import { isShop } from 'src/app/util/access-storge';
import { ShopBranchWorkTimeService } from '../../shop-branch-work-time/services';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-shop-branch-list',
  templateUrl: './shop-branch-list.component.html',
  styleUrls: ['./shop-branch-list.component.scss'],
})
export class ShopBranchListComponent implements OnInit {
  @ViewChild('addToWallet', { static: false }) addToWallet;
  @ViewChild('updateAllShopBranchesWorkTimeModal', { static: false })
  updateAllShopBranchesWorkTimeModal;

  shoplist: ShopBranch[] = [];
  titles: string[] = [
    'shop.shop_name',
    'field.descriptionLocation',
    'global.full_name',
    'global.phone_number',
    'field.email',
  ];
  properties: string[] = [
    'shopName',
    'descriptionLocation',
    'fullName',
    'phoneNumber',
    'email',
  ];
  @ViewChild('resetPass', { static: false }) resetPass;
  form: FormGroup;
  updateAllShopBranchesWorkTimeForm: FormGroup;
  rowData: ShopBranch = new ShopBranch();

  filter: ShopBranchFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  // roles
  roleAdmin: 'admin';
  roles: Roles = new Roles();
  admin: boolean;
  currentLanguage: string = '';
  showShopOrderReport: boolean = false;
  actionTableLIst: IActionLTable[] = [];

  markers: Marker[];

  currentShopId: number;

  currentWalletAmount: number;
  days = [
    { name: 'Sunday', value: 1 },
    { name: 'Saturday', value: 2 },
    { name: 'Monday', value: 3 },
    { name: 'Tuesday', value: 4 },
    { name: 'Wednesday', value: 5 },
    { name: 'Thursday', value: 6 },
    { name: 'Friday', value: 7 },
  ];

  constructor(
    private shopBranchService: ShopBranchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private shopBranchWorkTimeService: ShopBranchWorkTimeService,
    private excelService: ExcelService,
    private headerService: HeaderService,
    private shopBranchWalletService: ShopBranchWalletService
  ) {
    this.currentLanguage = this.translate.currentLang;
    this.form = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.updateAllShopBranchesWorkTimeForm = this.formBuilder.group({
      day: ['', [Validators.required]],
      firstShiftFromHour: ['', [Validators.required]],
      firstShiftToHour: ['', [Validators.required]],
      secondShiftFromHour: [''],
      secondShiftToHour: [''],
    });
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('shop_branch.name'));
    if (this.activatedRoute.snapshot.queryParams.shopId) {
      this.currentShopId = this.activatedRoute.snapshot.queryParams.shopId;
    }
    let roles: any[] = JSON.parse(localStorage.getItem('roles'));
    this.showShopOrderReport =
      roles.includes('administrator') ||
      roles.includes('employee') ||
      roles.includes('shop') ||
      roles.includes('operation');

    this.actionTableLIst = [
      {
        title: 'ShopBranchWorkTime.name',
        icon: 'la-business-time',
        type: 'ShopBranchWorkTime',
      },
      !isShop() && {
        title: 'menu.products',
        icon: 'fa-shopping-bag',
        type: 'product',
      },
      {
        title: 'menu.branchProduct',
        icon: 'fa-code-branch',
        type: 'productBranch',
      },
      !isShop() && { title: 'menu.Shop', icon: 'fa-store', type: 'shop' },
      { title: 'menu.Change_Password', icon: 'fa-lock-open', type: 'reset' },
      !isShop() && {
        title: 'field.staticses',
        icon: 'fa-chart-bar',
        type: 'staticses',
      },
      { title: 'field.Wallet', icon: 'fa-wallet', type: 'addToWallet' },
      {
        title: 'menu.shopProfit',
        icon: 'fa-hand-holding-usd',
        type: 'shopProfit',
      },
    ];

    if (this.showShopOrderReport)
      this.actionTableLIst.push({
        title: 'menu.ShopBranchsOrderReport',
        icon: 'fa-chart-pie',
        type: 'OrderReport',
      });

    this.markers = [];
    this.filter = new ShopBranchFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getShopBranchList(this.filter);
    let token = localStorage.getItem('token');
    this.roles = jwt_decode(token);

    if (this.roles.roles == this.roleAdmin) {
      this.admin == true;
    } else {
      this.admin == false;
    }
  }
  searchValue(): void {
    this.getShopBranchList(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ShopBranchFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }

  getShopBranchList(filter: ShopBranchFilter) {
    if (this.activatedRoute.snapshot.queryParams.shopId) {
      this.filter.ShopId = this.activatedRoute.snapshot.queryParams.shopId;
    }
    if (this.activatedRoute.snapshot.queryParams.shopBranchId) {
      this.filter.ShopBranchId =
        this.activatedRoute.snapshot.queryParams.shopBranchId;
    }
    this.busyLoading = true;
    this.spinner.show();
    this.shopBranchService.get(filter).subscribe(
      (res: List<ShopBranch>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.shoplist = res.data;
        delete res.data;
        this.pagination = { ...res };
        if (this.filter.ShopId && this.shoplist.length) {
          this.markers = this.shoplist.map((item) => {
            return {
              position: {
                lat: item.latitude,
                lng: item.longitude,
              },
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              label: {
                color: 'red ',
                text: item.descriptionLocation,
                fontSize: '13px',
              },
              title: item.shopName,
              options: { animation: google.maps.Animation.DROP },
            };
          });
        }
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
    this.shopBranchService
      .ChangeActivation(String(this.shoplist[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          // this.getShopBranchList(this.filter);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  changeShopBranchBusy(index: number) {
    console.log(index);
    this.spinner.show();
    this.shopBranchService
      .BusyChange(String(this.shoplist[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          // this.getShopBranchList(this.filter);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getShopBranchList(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getShopBranchList(this.filter);
  }
  navigate(shop: ShopBranch, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`shop-branch/edit/${shop.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`shop-branch/view/${shop.id}`]);
        break;

      default:
        break;
    }
  }

  navigateTO(shopBranch: { event: ShopBranch; type: string }) {
    switch (shopBranch.type) {
      case 'ShopBranchWorkTime':
        this.router.navigate([`shop-branch-work-time/${shopBranch.event.id}`]);
        break;
      case 'product':
        this.router.navigateByUrl(`product?shopId=${shopBranch.event.shopId}`);
        break;
      case 'productBranch':
        this.router.navigateByUrl(
          `branch-product?ShopBranchId=${shopBranch.event.id}`
        );
        break;
      case 'shop':
        this.router.navigateByUrl(`shop?shopName=${shopBranch.event.shopName}`);
        break;
      case 'reset':
        this.rowData = shopBranch.event;
        this.openModal();
        break;
      case 'staticses':
        this.router.navigateByUrl(
          `dashboard?shopId=${shopBranch.event.shopId}`
        );
        break;
      case 'OrderReport':
        this.router.navigateByUrl(
          `shop/order-report?shopId=${shopBranch.event.shopId}&shopBranch=${shopBranch.event.id}`
        );
        break;
      case 'addToWallet':
        this.router.navigateByUrl(
          `faster-wallet/branch-wallet?&shopBranchId=${shopBranch.event.id}`
        );
        break;
      case 'shopProfit':
        this.router.navigateByUrl(
          `report/shop-profit?shopId=${shopBranch.event.shopId}&shopBranchId=${shopBranch.event.id}`
        );
        break;

      default:
        break;
    }
  }

  getCurrentWalletAmount(id) {
    this.shopBranchWalletService
      .GetShopBranchWalletSum(id)
      .subscribe((result) => {
        this.currentWalletAmount = result;
      });
  }

  openModal() {
    this.modalService.open(this.resetPass, {
      backdropClass: 'light-blue-backdrop',
    });
  }
  openUpdateAllShopBranchesWorkTimeModal() {
    this.modalService.open(this.updateAllShopBranchesWorkTimeModal, {
      backdropClass: 'bg-light',
      size: 'xl',
    });
  }

  updateAllShopBranchesWorkTime() {
    this.updateAllShopBranchesWorkTimeForm.markAllAsTouched();
    if (!this.updateAllShopBranchesWorkTimeForm.valid) return;

    let body = {
      shopId: this.activatedRoute.snapshot.queryParams.shopId,
      workTimes: [{ ...this.updateAllShopBranchesWorkTimeForm.value }],
    };
    this.shopBranchWorkTimeService.updateAllShopBranchsWorkTime(body).subscribe(
      (result) => {
        this.form.reset();
        // this.form.get('id').patchValue(0);
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
        this.spinner.hide();
        this.modalService.dismissAll();
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
  resetPassword() {
    this.form.markAsTouched();
    this.form.get('userId').patchValue(this.rowData.applicationUserId);
    if (!this.form.valid) return;
    this.identityService.ResetPassword(this.form.value).subscribe(
      (result) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        this.form.reset();
        this.notifier.notify('success', this.translate.instant('action.done'));
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.shopBranchService.get(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.excelService.exportAsExcelFile(res.data, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
}
