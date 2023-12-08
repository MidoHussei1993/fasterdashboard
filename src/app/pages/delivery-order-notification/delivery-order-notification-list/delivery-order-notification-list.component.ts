import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeliveryOrderNotification } from '../models';
import { DeliveryOrderNotificationService } from '../services';
import { HeaderService } from 'src/app/core/services/header.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delivery-order-notification-list',
  templateUrl: './delivery-order-notification-list.component.html',
  styleUrls: ['./delivery-order-notification-list.component.scss'],
})
export class DeliveryOrderNotificationListComponent implements OnInit {
  deliveryOrderNotificationList: any[] = [];
  titles: string[] = ['field.message', 'field.messageAr', 'action.actions'];
  properties: string[] = ['message', 'messageAr'];
  busyLoading: boolean = true;

  constructor(
    private deliveryOrderNotificationService: DeliveryOrderNotificationService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.DeliveryOrderNotification')
    );
    this.getFaqsList();
  }

  getFaqsList() {
    this.busyLoading = true;
    this.spinner.show();
    this.deliveryOrderNotificationService.get().subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.deliveryOrderNotificationList = res;
        // this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }
  navigateToEdit(deliveryOrderNotification: DeliveryOrderNotification) {
    this.router.navigateByUrl(
      `/delivery-order-notification/edit/${deliveryOrderNotification.id}`
    );
  }
  navigateToView(deliveryOrderNotification: DeliveryOrderNotification) {
    this.router.navigateByUrl(
      `/delivery-order-notification/view/${deliveryOrderNotification.id}`
    );
  }
}
