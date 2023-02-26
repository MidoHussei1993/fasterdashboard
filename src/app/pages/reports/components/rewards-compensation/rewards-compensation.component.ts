import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { RewardCompensationFilter, TaxsReport } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-rewards-compensation',
  templateUrl: './rewards-compensation.component.html',
  styleUrls: ['./rewards-compensation.component.scss']
})
export class RewardsCompensationComponent implements OnInit {
  titles: string[] = [
    'field.clientId',
    'field.name',
    'field.phoneNumber',
    'provider.operation_amount',
    'field.userId',
    'field.userName',
    'field.userPhone',
    'field.typeName',
  ];
  properties: string[] = [
    'clientId',
    'clientName',
    'clientPhone',
    'amount',
    'userId',
    'userName',
    'userPhone',
    'type',
  ];
  busyLoading: boolean = true;
  filter: RewardCompensationFilter = new RewardCompensationFilter();
  rewardsCompensationList: TaxsReport[] = [];
  pagination: Pagination = new Pagination();

  constructor(
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private translate: TranslateService,

  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getRewardsAndCompensation();
  }

  searchValue(): void {
    this.getRewardsAndCompensation();
  }
  resetfilter() {
    this.filter = new RewardCompensationFilter();
    this.getRewardsAndCompensation();
  }

  getRewardsAndCompensation() {
    this.busyLoading = true;
    this.spinner.show();
    this.reportsService.getRewardsAndCompensation(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.rewardsCompensationList = res.data.map(item =>{
          if(item.type == 1){
            item.type = this.translate.instant('action.Withdrawal')
          }else if(item.type == 2){
            item.type = this.translate.instant('action.deposit')
          }
          else if(item.type == 0){
            item.type = this.translate.instant('field.all')
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
  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getRewardsAndCompensation();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getRewardsAndCompensation();
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.reportsService.getRewardsAndCompensation(downloadFilter).subscribe(
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
}
