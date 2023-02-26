import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ProviderSubscription, ProviderSubscriptionFilter } from '../models';
import { ProviderSubscriptionService } from '../services';

@Component({
  selector: 'app-provider-subscription-list',
  templateUrl: './provider-subscription-list.component.html',
  styleUrls: ['./provider-subscription-list.component.scss']
})
export class ProviderSubscriptionListComponent implements OnInit {
  providerSubscriptionList: ProviderSubscription[] = [];
  titles:string[] = [
    'menu.subscription',
    'menu.subscription',
    'field.description',
    'field.description',
  ];
  properties: string[] = [
    'subscriptionName',
    'subscriptionNameAr',
    'subscriptionDescription',
    'subscriptionDescriptionAr',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: ProviderSubscriptionFilter = new ProviderSubscriptionFilter();

  constructor(
    private providerSubscriptionService : ProviderSubscriptionService ,
    private spinner: NgxSpinnerService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private notify: NotifierService,

  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getFaqsList();
  }

  searchValue(searchValue: string): void {
    this.filter.SubscriptionName = searchValue;
    this.getFaqsList();
  }

  getFaqsList() {
    this.busyLoading = true;
    this.spinner.show();
    this.providerSubscriptionService .get(this.filter).subscribe(
      (res:any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.providerSubscriptionList = res.returnData.data;
        this.pagination = { ...res.returnData };
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
    this.getFaqsList();
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getFaqsList();
  }

  navigateToView(providerSubscription: ProviderSubscription) {
    this.router.navigateByUrl(`/provider-subscription/view/${providerSubscription.id}`);
  }


}
