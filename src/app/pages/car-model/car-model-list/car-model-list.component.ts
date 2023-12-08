import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List } from 'src/app/shared';
import { CarModel, CarModelFilter } from '../models';
import { CarModelService } from '../services';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.scss'],
})
export class CarModelListComponent implements OnInit {
  CarModelList: CarModel[] = [];
  titles: string[] = ['field.name', 'field.name'];
  properties: string[] = ['name', 'nameAr'];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: CarModelFilter = new CarModelFilter();

  constructor(
    private carModelService: CarModelService,
    private spinner: NgxSpinnerService,
    private headerService: HeaderService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('car.carModel'));
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCarModelList();
  }

  searchValue(): void {
    this.getCarModelList();
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CarModelFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getCarModelList();
  }

  getCarModelList() {
    this.busyLoading = true;
    this.spinner.show();
    this.carModelService.get(this.filter).subscribe(
      (res: List<CarModel>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.CarModelList = res.data;
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
    this.carModelService
      .ChangeActivation(String(this.CarModelList[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getCarModelList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCarModelList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCarModelList();
  }

  navigateToEdit(CarModel: CarModel) {
    this.router.navigateByUrl(`/car-model/edit/${CarModel.id}`);
  }
  navigateToView(CarModel: CarModel) {
    this.router.navigateByUrl(`/car-model/view/${CarModel.id}`);
  }
}
