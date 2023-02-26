import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { AddedFromPaymentReportFilter } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-added-from-payment',
  templateUrl: './added-from-payment.component.html',
  styleUrls: ['./added-from-payment.component.scss']
})
export class AddedFromPaymentComponent 
extends ListComponent<any, any>
implements OnInit
{

  filter:AddedFromPaymentReportFilter = new AddedFromPaymentReportFilter();
constructor(
  private reportsService: ReportsService,
  public route: ActivatedRoute,
  public notifier: NotifierService,
  public translate: TranslateService,
  public spinner: NgxSpinnerService,
  public router: Router,
  private excelService: ExcelService
) {
  super(reportsService, notifier, spinner, translate, route,router);
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
  this.spinner.show();
  this.reportsService
    .AddedFromPaymentReport(this.filter)
    .subscribe(
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
