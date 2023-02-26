import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomerAaddresses,
  CustomerService,
  List,
  ListComponent,
} from 'src/app/shared';
import { FasterWalletService } from '../../wallet/services/faster-wallet.service';

@Component({
  selector: 'app-customer-adresses',
  templateUrl: './customer-adresses.component.html',
  styleUrls: ['./customer-adresses.component.scss'],
})
export class CustomerAdressesComponent
  extends ListComponent<any, CustomerAaddresses>
  implements OnInit
{
  constructor(
    private customerService: CustomerService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) {
    super(customerService, notifier, spinner, translate, route, router);
    this.titles = [];
    this.properties = [];
  }

  ngOnInit(): void {
    this.filter = new CustomerAaddresses();
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.customerService.GetCustomerAddresses(this.filter).subscribe(
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
}
