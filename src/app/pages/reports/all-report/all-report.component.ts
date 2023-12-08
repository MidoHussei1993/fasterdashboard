import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { AddedFromPaymentReportFilter } from '../model';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-all-report',
  templateUrl: './all-report.component.html',
  styleUrls: ['./all-report.component.scss'],
})
export class AllReportComponent extends ListComponent<any, any> {
  filter: any = {};
  constructor(
    private reportsService: ReportsService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private excelService: ExcelService
  ) {
    super(reportsService, notifier, spinner, translate, route, router);
    this.titles = [
      'id',
      'field.Date',
      'field.customerName',
      'field.customerPhone',
      'provider.operation_amount',
      'field.deliveryOrderId',
      'field.TransportOrderId',
    ];
    this.properties = [
      'id',
      'createAt',
      'customerName',
      'customerPhone',
      'amount',
      'deliveryOrderId',
      'transportOrderId',
    ];
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    // const currentService = this.reportsService;

    this.spinner.show();
    this.reportsService[this.route.snapshot.params.id](this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.list = res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  resetfilter() {
    this.filter = new AddedFromPaymentReportFilter();
  }

  downloadAll() {
    this.excelService.exportAsExcelFile(this.list, 'data_file');
  }
}
