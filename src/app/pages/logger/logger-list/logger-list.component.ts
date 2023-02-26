import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Faqs, FaqsFilter } from '../../faqs/models';
import { Logger, LoggerFilter } from '../models';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-logger-list',
  templateUrl: './logger-list.component.html',
  styleUrls: ['./logger-list.component.scss'],
})
export class LoggerListComponent implements OnInit {
  loggerList: Logger[] = [];
  titles: string[] = [
    'field.CreateAtFrom',
    'field.email',
    'field.FullName',
    'field.projectName',
    'field.exceptionMessage',
    'field.pathAndDetails',
  ];
  properties: string[] = [
    'createAt',
    'email',
    'fullName',
    'projectName',
    'exceptionMessage',
    'pathAndDetails',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: LoggerFilter = new LoggerFilter();

  constructor(
    private loggerService: LoggerService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private notify: NotifierService
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getLoggerList();
  }

  searchValue(): void {
    this.getLoggerList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new LoggerFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getLoggerList();
  }

  getLoggerList() {
    this.busyLoading = true;
    this.spinner.show();
    this.loggerService.get(this.filter).subscribe(
      (res: List<Logger>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.loggerList = res.data;
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
    this.getLoggerList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getLoggerList();
  }
}
