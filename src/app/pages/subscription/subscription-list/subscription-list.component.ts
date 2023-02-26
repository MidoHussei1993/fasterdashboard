import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Subscription, SubscriptionFilter } from '../models';
import { SubscriptionService } from '../services';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss'],
})
export class SubscriptionListComponent implements OnInit {
  subscriptionList: Subscription[] = [];
  titles: string[] = [
    'subscription.name',
    'subscription.name',
    'subscription.PeriodInDay',
    'subscription.price',
  ];
  properties: string[] = [
    'subscriptionName',
    'subscriptionNameAr',
    'subscriptionPeriodInDay',
    'subscriptionPrice',
  ];
  filter: SubscriptionFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private swalService: SwalModalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter = new SubscriptionFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getsubscriptionList(this.filter);
  }

  searchValue(): void {
    this.getsubscriptionList(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new SubscriptionFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getsubscriptionList(this.filter);
  }
  getsubscriptionList(filter: SubscriptionFilter) {
    this.busyLoading = true;
    this.spinner.show();
    this.subscriptionService.get(filter).subscribe(
      (res: List<Subscription>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.subscriptionList = res.data;
        delete res.data;
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
    this.getsubscriptionList(this.filter);
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getsubscriptionList(this.filter);
  }

  changeActivation(index: number) {
    console.log(this.subscriptionList[index].isActive);
    this.spinner.show();
    this.subscriptionService
      .ChangeSubscriptionActivation({
        SubscriptionId: this.subscriptionList[index].id,
        IsActive: this.subscriptionList[index].isActive,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          console.log(res);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  navigate(shop: Subscription, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`subscription/edit/${shop.id}`]);
        break;
      case this.formMode.View:
        this.router.navigate([`subscription/view/${shop.id}`]);
        break;

      default:
        break;
    }
  }
}
