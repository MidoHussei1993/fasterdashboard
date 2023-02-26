import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pagination } from 'src/app/shared';
import { TransportOrderNotification } from '../models';
import { TransportOrderNotificationService } from '../services';

@Component({
  selector: 'app-transport-order-notification-list',
  templateUrl: './transport-order-notification-list.component.html',
  styleUrls: ['./transport-order-notification-list.component.scss'],
})
export class TransportOrderNotificationListComponent implements OnInit {
  transportOrderNotificationList: any[] = [];
  titles: string[] = ['field.message', 'field.messageAr', 'action.actions'];
  properties: string[] = ['message', 'messageAr'];
  busyLoading: boolean = true;

  constructor(
    private transportOrderNotificationService: TransportOrderNotificationService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFaqsList();
  }

  getFaqsList() {
    this.busyLoading = true;
    this.spinner.show();
    this.transportOrderNotificationService.get().subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.transportOrderNotificationList = res;
        // this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }
  navigateToEdit(transportOrderNotification: TransportOrderNotification) {
    this.router.navigateByUrl(
      `/transport-order-notification/edit/${transportOrderNotification.id}`
    );
  }
  navigateToView(transportOrderNotification: TransportOrderNotification) {
    this.router.navigateByUrl(
      `/transport-order-notification/view/${transportOrderNotification.id}`
    );
  }
}
