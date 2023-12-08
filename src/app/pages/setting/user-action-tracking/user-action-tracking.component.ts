import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerWallet, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { UserTrackingActionFilter } from '../models';
import { SettingService } from '../services/setting.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-user-action-tracking',
  templateUrl: './user-action-tracking.component.html',
  styleUrls: ['./user-action-tracking.component.scss'],
})
export class UserActionTrackingComponent implements OnInit {
  userActionList: CustomerWallet[] = [];
  titles: string[] = [
    'field.CreateAtTo',
    'field.FullName',
    'field.phoneNumber',
    'field.email',
    'field.action',
    'field.actionAr',
  ];
  properties: string[] = [
    'createAt',
    'fullName',
    'phoneNumber',
    'email',
    'action',
    'actionAr',
  ];
  pagination: Pagination = new Pagination();
  filter: UserTrackingActionFilter = new UserTrackingActionFilter();

  allTimeWork: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private settingService: SettingService,
    private activatedRoute: ActivatedRoute,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private notify: NotifierService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.userActionTracking')
    );
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    if (this.activatedRoute.snapshot.queryParamMap.get('providerId')) {
      this.filter.Note =
        this.activatedRoute.snapshot.queryParamMap.get('providerId');
      this.getUserActions();
    }

    // this.getUserActions();
  }

  searchValue(): void {
    this.getUserActions();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new UserTrackingActionFilter();
    this.filter.StringUserId = this.activatedRoute.snapshot.params.id;
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getUserActions();
  }

  getUserActions() {
    this.spinner.show();
    if (this.activatedRoute.snapshot.params.id) {
      this.filter.StringUserId = this.activatedRoute.snapshot.params.id;
    }
    this.settingService.getUserTrackingActions(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.userActionList = res.data;
        this.pagination = { ...res };
        this.getDiffDate();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  getDiffDate() {
    let today = new Date(this.userActionList[0].createAt);
    let Christmas = new Date(
      this.userActionList[this.userActionList.length - 1].createAt
    );
    let diffMs = (Christmas as any) - (today as any); // milliseconds between now & Christmas
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    this.allTimeWork = diffDays + ' days, ' + diffHrs + ' hours, ' + diffMins;
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getUserActions();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getUserActions();
  }
}
