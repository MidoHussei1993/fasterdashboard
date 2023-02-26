import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, Pagination } from 'src/app/shared';
import { Marker } from 'src/app/shared/components';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';
import { getColorDependOnNumber } from 'src/app/util';
import { IgnoredOrderFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss'],
})
export class HeatMapComponent implements OnInit {
  ignoredOrder: any[] = [];
  finalTotalMinutes: number = null;
  filter: IgnoredOrderFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  active: number = 1;
  markers: Marker[] = [];
  deliveryStatusList: Dropdown[] = [];
  traansportStatusList: Dropdown[] = [];
  currentLanguage: string = '';

  constructor(
    private reportService: ReportsService,
    private spinner: NgxSpinnerService,
    private orderStatusService: OrderStatusService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
    this.filter = new IgnoredOrderFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 50;
    this.filter.StartDate = new Date();
    this.getworkTimeRportList(this.filter);
    this.DeliveryOrderStatusDDL();
    this.TransportOrderStatusDDL();
  }

  DeliveryOrderStatusDDL(): void {
    this.orderStatusService.DeliveryOrderStatusDDL().subscribe(
      (res) => {
        this.deliveryStatusList = res;
      },
      (err) => {}
    );
  }

  TransportOrderStatusDDL(): void {
    this.orderStatusService.TransportOrderStatusDDL().subscribe(
      (res) => {
        this.traansportStatusList = res;
      },
      (err) => {}
    );
  }

  searchValue(): void {
    this.getworkTimeRportList(this.filter);
  }
  reset() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new IgnoredOrderFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getworkTimeRportList(this.filter);
  }

  getworkTimeRportList(filter: IgnoredOrderFilter) {
    this.ignoredOrder = [];
    this.busyLoading = true;
    this.spinner.show();
    this.reportService.IgnoredOrderReport(filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.ignoredOrder = res;
        this.markers = this.ignoredOrder.map((item) => {
          return {
            position: {
              lat: item.latitude,
              lng: item.longitude,
            },
            icon: `http://maps.google.com/mapfiles/ms/icons/${getColorDependOnNumber(
              item.orderType
            )}-dot.png`,
            label: {
              color: getColorDependOnNumber(item.orderType),
              fontSize: '23px',
              text: ' ',
            },
            title: String(item.deliveryOrderId),
            options: { animation: google.maps.Animation.DROP },
          };
        });
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }
}
