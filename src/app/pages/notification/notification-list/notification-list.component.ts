import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { NotificationFilter } from '../models';
import { NotificationService } from '../services/notification.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  notificationList: any[] = [];
  titles: string[] = [
    'field.CreateAtTo',
    'field.title_en',
    'field.titleAr',
    'field.message',
    'field.messageAr',
  ];
  properties: string[] = [
    'createAt',
    'title',
    'titleAr',
    'message',
    'messageAr',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: NotificationFilter = new NotificationFilter();

  constructor(
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private notify: NotifierService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.notifications')
    );
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getNotificationList();
  }

  searchValue(): void {
    this.getNotificationList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new NotificationFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getNotificationList();
  }

  getNotificationList() {
    this.busyLoading = true;
    this.spinner.show();
    this.notificationService.get(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.notificationList = res.returnData.data;
        delete res.returnData.data;
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
    this.getNotificationList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getNotificationList();
  }

  navigateToEdit(any: any) {
    this.router.navigateByUrl(`/notification/edit/${any.id}`);
  }
  navigateToView(any: any) {
    this.router.navigateByUrl(`/notification/view/${any.id}`);
  }

  deleteNotification(any: any) {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.notificationService.delete(any.id).subscribe(
          (res) => {
            const deletedIndex = this.notificationList.findIndex(
              (item) => item.id == any.id
            );
            this.notificationList.splice(deletedIndex, 1);
            this.spinner.hide();
            this.notify.notify(
              'success',
              this.translate.instant('global.deleted')
            );
          },
          (err) => {
            this.spinner.hide();
            this.notify.notify(
              'error',
              this.translate.instant('global.server_error')
            );
            console.log(err);
          }
        );
      }
    });
  }

  navigateTO(notification: { event: any; type: string }) {
    switch (notification.type) {
      case 'resend':
        this.spinner.show();
        this.notificationService.reSend(notification.event.id).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.notify.notify(
              'success',
              this.translate.instant('action.done')
            );
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
            this.busyLoading = false;
          }
        );
        break;

      default:
        break;
    }
  }
}
