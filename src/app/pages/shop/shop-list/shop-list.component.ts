import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { isShop } from 'src/app/util/access-storge';
import { IdentityService } from '../../identity/services/identity.service';
import { ShopBranchService } from '../../shop-branch/services';
import { ShopTypeService } from '../../shop-type/services';
import { Shop, ShopFilter } from '../models';
import { ShopService } from '../services';
import { isAdmin } from 'src/app/util/access-storge';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  shoplist: Shop[] = [];
  titles: string[] = [
    'shop.shop_name',
    'shop.shop_name',
    'global.user_name',
    'global.full_name',
    'global.type',
    'global.type',
    'isPartnerPostPay',
    'feedusId',
    // 'global.user_type',
  ];
  properties: string[] = [
    'shopName',
    'shopNameAr',
    'userName',
    'fullName',
    'type',
    'typeAr',
    'isPartnerPostPay',
    'feedusId',
    // 'userType',
  ];
  @ViewChild('addToWallet', { static: false }) addToWallet;
  @ViewChild('resetPass', { static: false }) resetPass;
  @ViewChild('uploadShopBranchesModal', { static: false })
  uploadShopBranchesModal;
  form: FormGroup;

  filter: ShopFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  shopTypeList: any[] = [];
  busyLoadingShopType: boolean = false;
  currentLanguage: string = '';
  rowData: Shop = new Shop();
  currentShopId: number;
  isShopRoles: boolean = false;
  isAdmin: boolean = false;
  actionList = [];

  constructor(
    private shopService: ShopService,
    private shopBranchService: ShopBranchService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private shopTypeService: ShopTypeService,
    private notifier: NotifierService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private swalService: SwalModalService,
    private headerService: HeaderService,
    private identityService: IdentityService
  ) {
    this.currentLanguage = this.translate.currentLang;
    this.form = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('shop.shop'));
    this.isShopRoles = isShop();
    this.isAdmin = isAdmin();
    this.actionList = [
      { title: 'menu.products', icon: 'fa-shopping-bag', type: 'product' },
      { title: 'shop_branch.name', icon: 'fa-code-branch', type: 'branch' },
      !isShop() && {
        title: 'menu.Change_Password',
        icon: 'fa-lock-open',
        type: 'reset',
      },
      !isShop() && {
        title: 'field.staticses',
        icon: 'fa-chart-bar',
        type: 'staticses',
      },
      !isShop() && {
        title: 'action.uploadShopBranches',
        icon: 'fa-file-excel',
        type: 'uploadBranches',
      },
      !isShop() && {
        title: 'menu.fixedShopAmount',
        icon: 'fa-charging-station',
        type: 'fixedShopAmount',
      },
      !isShop() && {
        title: 'field.activeShop',
        icon: 'fa-check text-success',
        type: 'activeShop',
      },
      ,
      !isShop() && {
        title: 'field.unActivateShop',
        icon: 'fa-times text-danger',
        type: 'unActivateShop',
      },
      {
        title: 'menu.shopProfit',
        icon: 'fa-hand-holding-usd',
        type: 'shopProfit',
      },
      { title: 'menu.foodType', icon: 'fa-utensils', type: 'foodType' },
    ];
    let roles: any[] = JSON.parse(localStorage.getItem('roles'));
    // let isAdmin = roles.includes('administrator');
    // if (isAdmin) {
    //   this.actionList.push(
    //     {title:'action.addToWallet',icon:'fa-wallet',type:'addToWallet'}
    //   )

    // }
    this.filter = new ShopFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getShopList(this.filter);
    this.getShopTypeDDL();
  }

  async handleInputChange(event) {
    const file = event.target.files[0];
    this.spinner.show();
    this.shopService.AddByExcel(file).subscribe(
      (res) => {
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('_.successUpload')
        );
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  downloadExcelFile() {
    this.spinner.show();
    this.shopService.DownloadExcelSample().subscribe(
      (data) => {
        this.spinner.hide();
        let blob = new Blob([data], {
          type: 'application/vnd.ms-excel',
        });
        // url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'shop.xls';
        a.click();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  getShopTypeDDL() {
    this.busyLoadingShopType = true;
    this.shopTypeService.getDropdown().subscribe(
      (res: any) => {
        this.busyLoadingShopType = false;
        this.shopTypeList = res;
      },
      (err) => {
        console.log(err);
        this.busyLoadingShopType = false;
      }
    );
  }
  filterShopList(event) {
    this.filter.ShopTypeId = event;
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
    this.filter = new ShopFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getShopList(this.filter);
  }

  getShopList(filter: ShopFilter) {
    if (this.activatedRoute.snapshot.queryParamMap.get('shopName')) {
      filter.ShopName =
        this.activatedRoute.snapshot.queryParamMap.get('shopName');
    }
    this.busyLoading = true;
    this.spinner.show();
    this.shopService.get(filter).subscribe(
      (res: List<Shop>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.shoplist = res.data.map((item: any) => {
          if (item.isPartnerPostPay) {
            item.isPartnerPostPay = this.translate.instant('action.yes');
          } else {
            item.isPartnerPostPay = this.translate.instant('action.no');
          }
          return item;
        });
        console.log(
          '🚀 ~ file: shop-list.component.ts:244 ~ ShopListComponent ~ this.shoplist=res.data.map ~ this.shoplist:',
          this.shoplist
        );
        delete res.data;
        this.pagination = { ...res };
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.busyLoading = false;
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
  navigate(shop: Shop, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        const edit = this.router.serializeUrl(
          this.router.createUrlTree([`shop/edit/${shop.id}`])
        );
        window.open(edit, '_blank');
        break;
      case this.formMode.View:
        const view = this.router.serializeUrl(
          this.router.createUrlTree([`shop/view/${shop.id}`])
        );
        window.open(view, '_blank');
        break;

      default:
        break;
    }
  }
  navigateTO(shop: { event: Shop; type: string }) {
    switch (shop.type) {
      case 'product':
        const product = this.router.serializeUrl(
          this.router.createUrlTree([`/product`], {
            queryParams: {
              shopId: shop.event.id,
            },
          })
        );
        window.open(product, '_blank');
        break;
      case 'branch':
        const branch = this.router.serializeUrl(
          this.router.createUrlTree([`/shop-branch`], {
            queryParams: {
              shopId: shop.event.id,
            },
          })
        );
        window.open(branch, '_blank');
        break;
      case 'reset':
        this.rowData = shop.event;
        console.log(this.rowData);
        this.openModal();
        break;
      case 'staticses':
        const dashboard = this.router.serializeUrl(
          this.router.createUrlTree([`/dashboard`], {
            queryParams: {
              shopId: shop.event.id,
            },
          })
        );
        window.open(dashboard, '_blank');
        break;
      case 'uploadBranches':
        this.currentShopId = shop.event.id;
        this.modalService.open(this.uploadShopBranchesModal);
        break;
      case 'shopProfit':
        const shopProfit = this.router.serializeUrl(
          this.router.createUrlTree([`/report/shop-profit`], {
            queryParams: {
              shopId: shop.event.id,
            },
          })
        );
        window.open(shopProfit, '_blank');
        break;
      case 'uploadBranches':
        this.currentShopId = shop.event.id;
        this.modalService.open(this.uploadShopBranchesModal);
        break;
      case 'foodType':
        const foodType = this.router.serializeUrl(
          this.router.createUrlTree([`/food-type/shop`], {
            queryParams: {
              shopId: shop.event.id,
            },
          })
        );
        window.open(foodType, '_blank');
        break;
      case 'fixedShopAmount':
        const fixedShopAmount = this.router.serializeUrl(
          this.router.createUrlTree([`/fixed-shop-amount`], {
            queryParams: {
              shopId: shop.event.id,
            },
          })
        );
        window.open(fixedShopAmount, '_blank');
        break;
      case 'activeShop':
        this.ChangeAllShopBranchesActivation(shop.event.id, true);
        break;
      case 'unActivateShop':
        this.ChangeAllShopBranchesActivation(shop.event.id, false);
        break;

      default:
        break;
    }
  }

  async uploadShopBranchesFile(event) {
    const file = event.target.files[0];
    console.log(event);
    this.spinner.show();
    this.shopBranchService.AddByExcel(this.currentShopId, file).subscribe(
      (res) => {
        this.spinner.hide();
        this.modalService.dismissAll();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  openModal() {
    this.modalService.open(this.resetPass, {
      backdropClass: 'light-blue-backdrop',
    });
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

  changePartnerStatus(index: number) {
    console.log(index);
    this.spinner.show();
    this.shopService.changePartnerStatus(this.shoplist[index].id).subscribe(
      (res) => {
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.shopService.get(downloadFilter).subscribe(
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

  ChangeAllShopBranchesActivation(id: any, state: boolean): void {
    this.swalService.Confirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.shopService.ChangeAllShopBranchesActivation(id, state).subscribe(
          (res) => {
            this.spinner.hide();
            this.notifier.notify(
              'success',
              this.translate.instant('action.done')
            );
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }
  navigateToUpdateAllShopBranchesWorkTime() {
    this.router.navigateByUrl('/shop-branchs-work-time');
  }
}
