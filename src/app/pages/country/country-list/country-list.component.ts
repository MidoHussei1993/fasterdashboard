import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Country } from '../country.model';
import { CountryFilter } from '../countryFilter.model';
import { SharedServiceService } from '../SharedService.service';
import { CountryList } from './countryList.model';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  Countrylist: Country[] = [];
  countrylistDeleted: Dropdown[] = [];
  titles: string[] = ['Country Name English', 'Country Name Arabic'];
  properties: string[] = ['countryName', 'countryNameAr'];
  filter: CountryFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  activeTab: string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }

  // inject service
  constructor(
    private router: Router,
    private sharedService: SharedServiceService,
    private swalService: SwalModalService,
    private headerService: HeaderService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.Country'));
    this.filter = new CountryFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getcountryFilter(this.filter);
  }

  searchValue(): void {
    this.getcountryFilter(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CountryFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }
  // get all country
  getcountryFilter(filter: CountryFilter) {
    this.busyLoading = true;
    this.sharedService.getList(filter).subscribe(
      (res: List<Country>) => {
        this.busyLoading = false;
        this.Countrylist = res.data;
        delete res.data;
        this.pagination = { ...res };
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
    this.getcountryFilter(this.filter);
  }

  setPageNumber(pageNumber: any) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getcountryFilter(this.filter);
  }

  navigate(country: Country, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`country/edit/${country.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`country/view/${country.id}`]);
        break;

      default:
        break;
    }
  }
}
