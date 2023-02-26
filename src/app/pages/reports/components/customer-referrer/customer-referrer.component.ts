import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ListComponent,
  CustomerAaddresses,
  CustomerService,
} from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-customer-referrer',
  templateUrl: './customer-referrer.component.html',
  styleUrls: ['./customer-referrer.component.scss'],
})
export class CustomerReferrerComponent
  extends ListComponent<any, any>
  implements OnInit
{
  constructor(
    private customerService: CustomerService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private excelService: ExcelService
  ) {
    super(customerService, notifier, spinner, translate, route,router);
    this.titles = [
      'id',
      'field.Date',
      'field.email',
      'field.FullName',
      'field.phoneNumber',
      'field.total',
      'field.totalFinishedOrders',
    ];
    this.properties = [
      'id',
      'createAt',
      'email',
      'fullName',
      'phoneNumber',
      'totalOrders',
      'totalFinishedOrders',
    ];
  }

  ngOnInit(): void {
    // this.filter = new CustomerAaddresses();
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.customerService
      .GetReferrerReport(this.route.snapshot.params.id)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.list = res.returnData;
          // this.pagination = { ...res };
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }

  resetfilter() {
    this.filter = new CustomerAaddresses();
  }

  downloadAll() {
    this.excelService.exportAsExcelFile(this.list, 'data_file');
  }
}
