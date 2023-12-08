import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination, UserType } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { GeneralSuggest, GeneralSuggestFilter } from '../models';
import { GeneralSuggestService } from '../services';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-general-suggest-list',
  templateUrl: './general-suggest-list.component.html',
  styleUrls: ['./general-suggest-list.component.scss'],
})
export class GeneralSuggestListComponent implements OnInit {
  generalSuggestlist: GeneralSuggest[] = [];
  titles: string[] = [
    'ID',
    'category.Date',
    'generalSuggest.title',
    'field.sentFrom',
    'cobone.status',
  ];
  properties: string[] = ['id', 'createAt', 'title', 'userTypeName', 'status'];
  filter: GeneralSuggestFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  userTypeDropDown = UserType;

  constructor(
    private generalSuggestService: GeneralSuggestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private swalService: SwalModalService,
    private notify: NotifierService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.general_suggest')
    );
    this.filter = new GeneralSuggestFilter();
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
    this.filter = new GeneralSuggestFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getShopList(this.filter);
  }
  getShopList(filter: GeneralSuggestFilter) {
    this.busyLoading = true;
    this.spinner.show();
    this.generalSuggestService.get(filter).subscribe(
      (res: List<GeneralSuggest>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.generalSuggestlist = res.data;
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
    this.getShopList(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getShopList(this.filter);
  }
  navigate(generalSuggest: GeneralSuggest, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`general-suggest/edit/${generalSuggest.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`general-suggest/view/${generalSuggest.id}`]);
        break;

      default:
        break;
    }
  }
  deleteRow(row: GeneralSuggest) {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.generalSuggestService.delete(row.id).subscribe(
          (res) => {
            const deletedIndex = this.generalSuggestlist.findIndex(
              (item) => item.id == row.id
            );
            this.generalSuggestlist.splice(deletedIndex, 1);
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
