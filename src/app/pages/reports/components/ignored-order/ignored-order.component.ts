import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkTimeReportFilter } from 'src/app/pages/provider/models';
import { Pagination, FormMode } from 'src/app/shared';
import { Marker } from 'src/app/shared/components';
import { IgnoredOrderFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-ignored-order',
  templateUrl: './ignored-order.component.html',
  styleUrls: ['./ignored-order.component.scss']
})
export class IgnoredOrderComponent implements OnInit {
  ignoredOrder: any[] = [];
  finalTotalMinutes:number = null;
  filter: IgnoredOrderFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  active: number = 1;
  markers:Marker[]= [];

  constructor(
    private reportService: ReportsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
    ) {
    }

  ngOnInit(): void {
    this.filter = new IgnoredOrderFilter();
    this.getworkTimeRportList(this.filter);
  }

  searchValue(): void {
    this.getworkTimeRportList(this.filter);
  }
  reset() {
    this.filter = new IgnoredOrderFilter();
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
        this.markers = this.ignoredOrder.map(item =>{
          return {
            position: {
              lat: item.latitude,
              lng: item.longitude,
            },
            label: {
              color: 'blue',
              fontSize: "23px",
              text: ' ',
            },
            title: String(item.deliveryOrderId),
            options: { animation: google.maps.Animation.DROP },
          }
        })
        
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

 

}
