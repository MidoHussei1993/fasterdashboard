import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { CarClass, CarClassFilter } from '../models';
import { CarClassService } from '../services';

@Component({
  selector: 'app-car-class-list',
  templateUrl: './car-class-list.component.html',
  styleUrls: ['./car-class-list.component.scss']
})
export class CarClassListComponent implements OnInit {
  CarClassList: CarClass[] = [];
  titles:string[] = [
    'field.name',
    'field.name',
  ];
  properties: string[] = [
    'name',
    'nameAr', 
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: CarClassFilter = new CarClassFilter();

  constructor(
    private carClassService: CarClassService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCarClassList();
  }

  searchValue( ): void {
    this.getCarClassList();
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CarClassFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getCarClassList();
  }
  getCarClassList() {
    this.busyLoading = true;
    this.spinner.show();
    this.carClassService.get(this.filter).subscribe(
      (res: List<CarClass>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.CarClassList = res.data;
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
    this.carClassService
      .ChangeActivation(String(this.CarClassList[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getCarClassList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCarClassList();
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCarClassList();
  }
 
  navigateToEdit(CarClass: CarClass) {
    this.router.navigateByUrl(`/car-class/edit/${CarClass.id}`);
  }
  navigateToView(CarClass: CarClass) {
    this.router.navigateByUrl(`/car-class/view/${CarClass.id}`);
  }
}
