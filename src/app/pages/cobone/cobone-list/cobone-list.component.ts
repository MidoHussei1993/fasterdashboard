import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Cobone, CoboneFilter } from '../models';
import { CoboneService } from '../services';

@Component({
  selector: 'app-cobone-list',
  templateUrl: './cobone-list.component.html',
  styleUrls: ['./cobone-list.component.scss'],
})
export class CoboneListComponent implements OnInit {
  Cobonelist: any[] = [];
  cobonelistDeleted: Dropdown[] = [];
  titles: string[] = [
    'field.CoboneCode',
    'provider.operation_amount',
    'cobone.Limitation',
    'field.ExpiryDateFrom',
    'field.ExpiryDateTo',
    'field.ShopName',
    'field.customerLimit',
    'field.coboneStatus',
  ];
  properties: string[] = [
    'coboneCode',
    'amount',
    'limitation',
    'createAt',
    'expiryDate',
    'shopName',
    'numberOfUse',
    'work',
  ];
  filter: CoboneFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  activeTab: string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private coboneService: CoboneService,
    private router: Router,
    private translate: TranslateService,
    private swalService: SwalModalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter = new CoboneFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCoboneList(this.filter);
    // this.getCoboneListDeleted();
  }
  searchValue(): void {
    this.getCoboneList(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CoboneFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getCoboneList(this.filter);
  }
  getCoboneList(filter: CoboneFilter) {
    this.busyLoading = true;
    this.spinner.show();
    this.coboneService.get(filter).subscribe(
      (res: List<any>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.Cobonelist = res.data.map((item) => {
          if (item.isActive) {
            item.work = this.translate.instant('field.work');
          } else {
            item.work = this.translate.instant('field.notWork');
          }
          return item;
        });
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
  getCoboneListDeleted() {
    this.busyLoading = true;
    this.coboneService.Deleted().subscribe(
      (res: Dropdown[]) => {
        this.busyLoading = false;
        this.cobonelistDeleted = res;
      },
      (err) => {
        console.log(err);
        this.busyLoading = false;
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCoboneList(this.filter);
  }

  setPageNumber(pageNumber: any) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCoboneList(this.filter);
  }
  deleteItem(item: Cobone) {
    this.swalService
      .showDeleteConfirmation(item.coboneCode)
      .then((result) => {})
      .catch((err) => {});
  }
  navigate(shop: Cobone, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`cobone/edit/${shop.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`cobone/view/${shop.id}`]);
        break;

      default:
        break;
    }
  }
  navigateTO(cobone: { event: Cobone; type: string }) {
    switch (cobone.type) {
      case 'product':
        const product = this.router.serializeUrl(
          this.router.createUrlTree([
            `/cobone-report/delivery/${cobone.event.id}`,
          ])
        );
        window.open(product, '_blank');
        break;
    }
  }

  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.coboneService
      .ChangeActivation(String(this.Cobonelist[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
}
