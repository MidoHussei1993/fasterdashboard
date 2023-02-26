import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { CustomerOrderBounsFilter } from '../models';
import { CustomerOrderBounsService } from '../services/customer-order-bouns.service';

@Component({
  selector: 'app-customer-bonus-list',
  templateUrl: './customer-bonus-list.component.html',
  styleUrls: ['./customer-bonus-list.component.scss'],
})
export class CustomerBonusListComponent implements OnInit {
  cusomerOrderBonusList: any[] = [];
  titles: string[] = [
    'ID',
    'field.startAt',
    'field.endAt',
    'field.allowedOrderCountPerCustomer',
    'field.limitations',
    'field.deliveryBonus',
    'field.taxiBonus',
    'field.transportBonus',
  ];
  properties: string[] = [
    'id',
    'startAt',
    'endAt',
    'allowedOrderCountPerCustomer',
    'limitations',
    'deliveryBonus',
    'taxiBonus',
    'transportBonus',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: CustomerOrderBounsFilter = new CustomerOrderBounsFilter();

  constructor(
    private customerOrderBonusService: CustomerOrderBounsService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private excelService: ExcelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCustomerOrderBonusList();
  }

  searchValue(): void {
    this.getCustomerOrderBonusList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CustomerOrderBounsFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getCustomerOrderBonusList();
  }

  getCustomerOrderBonusList() {
    this.busyLoading = true;
    this.spinner.show();
    this.customerOrderBonusService.get(this.filter).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.cusomerOrderBonusList = res.data;
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
    this.getCustomerOrderBonusList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCustomerOrderBonusList();
  }

  changeActivation(index: any) {
    console.log(index);
    this.spinner.show();
    this.customerOrderBonusService
      .ChangeActivation(String(this.cusomerOrderBonusList[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (res.errorMessage) {
            this.notifier.notify('success', res.errorMessage);
          }
          this.getCustomerOrderBonusList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  navigateToView(CustomerOrderBonus: any) {
    this.router.navigateByUrl(
      `/customer-orders-bonus/view/${CustomerOrderBonus.id}`
    );
  }
  navigateTO(motivation: { event: any; type: string }) {
    switch (motivation.type) {
      case 'duplicate':
        this.getCustomerOrderBonus(motivation.event.id)
        break;
      // case 'evaluate':
      //   const evaluate = this.router.serializeUrl(
      //     this.router.createUrlTree([`/motivation/evaluate`], {
      //       queryParams: {
      //         evaluate: motivation.event.id,
      //       },
      //     })
      //   );
      //   window.open(evaluate, '_blank');
      //   break;

      default:
        break;
    }
  }
  getCustomerOrderBonus(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.customerOrderBonusService.getByID(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.excelService.exportAsExcelFile([res], 'data_file');
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
}
