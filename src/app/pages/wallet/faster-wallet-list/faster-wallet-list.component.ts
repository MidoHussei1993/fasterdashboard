import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Faqs } from '../../faqs/models';
import { FasterWalletFilter } from '../models/faster-wallet.filter';
import { FasterWalletService } from '../services/faster-wallet.service';

@Component({
  selector: 'app-faster-wallet-list',
  templateUrl: './faster-wallet-list.component.html',
  styleUrls: ['./faster-wallet-list.component.scss'],
})
export class FasterWalletListComponent implements OnInit {
  mainList: any[] = [];
  titles: string[] = [
    'Id',
    'field.Date',
    'field.Name',
    'field.phoneNumber',
    'provider.operation_amount',
    'field.deliveryOrderId',
    'field.TransportOrderId',
    'field.note',
  ];
  properties: string[] = [
    'actionUserId',
    'createAt',
    'actionUserName',
    'phoneNumber',
    'amount',
    'deliveryOrderId',
    'transportOrderId',
    'note',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  total: number = null;

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: FasterWalletFilter = new FasterWalletFilter();

  constructor(
    private fasterWalletService: FasterWalletService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private notify: NotifierService
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getmainList();
    this.getFasterWalletSum();
  }

  searchValue(): void {
    this.getmainList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new FasterWalletFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getmainList();
  }

  getFasterWalletSum(){
    this.fasterWalletService.GetFasterWalletSum().subscribe(
      (res) => {
        this.total = res;
      },
      (err) => {
        console.log(err);
      })
  }

  getmainList() {
    this.busyLoading = true;
    this.spinner.show();
    this.fasterWalletService.get(this.filter).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.mainList = res.data;
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
    this.getmainList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getmainList();
  }
}
