import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List, Dropdown } from 'src/app/shared';
import { CarModelService } from '../../car-model/services';
import { CarName, CarNameFilter } from '../models';
import { CarNameService } from '../services';

@Component({
  selector: 'app-car-name-list',
  templateUrl: './car-name-list.component.html',
  styleUrls: ['./car-name-list.component.scss']
})
export class CarNameListComponent implements OnInit {
  CarNameList: CarName[] = [];
  titles:string[] = [
    'field.name',
    'field.name',
    'menu.carModel',
    'menu.carModel',

  ];
  properties: string[] = [
    'name',
    'nameAr', 
    'carModelName', 
    'carModelNameAr', 
  ];
  carModelList: Dropdown[] = [];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  currentLanguage: string = '';


  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: CarNameFilter = new CarNameFilter();

  constructor(
    private carNameService: CarNameService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private carModelService: CarModelService,
    private translate: TranslateService,
  ) {
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCarNameList();
    this.getCarModelDDL();
  }
  getCarModelDDL() {
    this.carModelService.getDropdown().subscribe(
      (res: any) => {
        this.carModelList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setCarModel(event) {
    this.filter.CarModelId = event;
    console.log(event)
    console.log(this.filter)
  }

  searchValue(): void {
    this.getCarNameList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CarNameFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getCarNameList();
  }

  getCarNameList() {
    console.log(this.filter)
    this.busyLoading = true;
    this.spinner.show();
    this.carNameService.get(this.filter).subscribe(
      (res: List<CarName>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.CarNameList = res.data;
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
    this.carNameService
      .ChangeActivation(String(this.CarNameList[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getCarNameList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCarNameList();
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCarNameList();
  }

 
  navigateToEdit(CarName: CarName) {
    this.router.navigateByUrl(`/car-name/edit/${CarName.id}`);
  }
  navigateToView(CarName: CarName) {
    this.router.navigateByUrl(`/car-name/view/${CarName.id}`);
  }
}
