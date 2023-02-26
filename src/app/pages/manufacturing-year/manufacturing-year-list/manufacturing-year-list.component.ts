import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List } from 'src/app/shared';
import { ManufacturingYear, ManufacturingYearFilter } from '../models';
import { ManufacturingYearService } from '../services/manufacturing-year.service';

@Component({
  selector: 'app-manufacturing-year-list',
  templateUrl: './manufacturing-year-list.component.html',
  styleUrls: ['./manufacturing-year-list.component.scss']
})
export class ManufacturingYearListComponent implements OnInit {
  ManufacturingYearList: ManufacturingYear[] = [];
  titles:string[] = [
    'field.year',
  ];
  properties: string[] = [
    'year', 
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: ManufacturingYearFilter = new ManufacturingYearFilter();

  constructor(
    private manufacturingYearService: ManufacturingYearService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getManufacturingYearList();
  }

  searchValue(): void {
    this.getManufacturingYearList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ManufacturingYearFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getManufacturingYearList();
  }

  getManufacturingYearList() {
    this.busyLoading = true;
    this.spinner.show();
    this.manufacturingYearService.get(this.filter).subscribe(
      (res: List<ManufacturingYear>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.ManufacturingYearList = res.data;
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
    this.manufacturingYearService
      .ChangeActivation(String(this.ManufacturingYearList[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getManufacturingYearList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getManufacturingYearList();
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getManufacturingYearList();
  }

 
  navigateToEdit(ManufacturingYear: ManufacturingYear) {
    this.router.navigateByUrl(`/manufacturing-year/edit/${ManufacturingYear.id}`);
  }
  navigateToView(ManufacturingYear: ManufacturingYear) {
    this.router.navigateByUrl(`/manufacturing-year/view/${ManufacturingYear.id}`);
  }
}
