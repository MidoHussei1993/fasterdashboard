import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { AllProvidersWorkingTimeReport, AllProvidersWorkingTimeReportFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-all-providers-working-time',
  templateUrl: './all-providers-working-time.component.html',
  styleUrls: ['./all-providers-working-time.component.scss']
})
export class AllProvidersWorkingTimeComponent implements OnInit {
  allProvidersWorkingTimeReport: AllProvidersWorkingTimeReport[] = [];
  titles:string[] = [
    'field.ProviderId',
    'field.Name',
    'field.phoneNumber',
    'field.finalTotalMinutes',
  ];
  properties: string[] = [
    'providerId',
    'providerName',
    'providerPhone',
    'finalTotalMinutes',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: AllProvidersWorkingTimeReportFilter = new AllProvidersWorkingTimeReportFilter();

  constructor(
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private excelService:ExcelService,

  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    // this.getAllProvidersWorkingTimeReport();
  }

  searchValue(): void {
    this.getAllProvidersWorkingTimeReport();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new AllProvidersWorkingTimeReportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getAllProvidersWorkingTimeReport();
  }

  getAllProvidersWorkingTimeReport() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportsService.AllProvidersWorkingTimeReport(this.filter).subscribe(
      (res: List<AllProvidersWorkingTimeReport>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.allProvidersWorkingTimeReport = res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getAllProvidersWorkingTimeReport();
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getAllProvidersWorkingTimeReport();
  }
  downloadAll(){
    let downloadFilter : any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.reportsService.AllProvidersWorkingTimeReport(downloadFilter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.excelService.exportAsExcelFile(res.data, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    )
  }

}