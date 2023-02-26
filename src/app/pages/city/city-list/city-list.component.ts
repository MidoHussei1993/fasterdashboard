import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { SharedServiceService } from '../../country/SharedService.service';
import { City } from '../city.model';
import { CityFilter } from '../cityFilter.model';
import { AllCity } from './Cities.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit {
  Citylist: AllCity[] = [];

  titles: string[] = [
    'city Name English',
    'city Name Arabic',
    'Country Name English',
    'Country Name Arabic',
  ];
  properties: string[] = [
    'cityName',
    'cityNameAr',
    'countryName',
    'countryNameAr',
  ];
  filter: CityFilter;
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
    private spinenr: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter = new CityFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getcityFilter(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CityFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }

  searchValue(): void {
    this.getcityFilter(this.filter);
  }
  // get all city
  getcityFilter(filter: CityFilter) {
    this.busyLoading = true;
    this.sharedService.getAllCity(filter).subscribe(
      (res: List<AllCity>) => {
        this.busyLoading = false;
        this.Citylist = res.data;
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
    this.getcityFilter(this.filter);
  }

  setPageNumber(pageNumber: any) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getcityFilter(this.filter);
  }

  navigate(country: City, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`city/edit/${country.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`city/view/${country.id}`]);
        break;

      default:
        break;
    }
  }
}
