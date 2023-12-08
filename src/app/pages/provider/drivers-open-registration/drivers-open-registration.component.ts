import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { ProviderService } from '../services';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-drivers-open-registration',
  templateUrl: './drivers-open-registration.component.html',
  styleUrls: ['./drivers-open-registration.component.scss'],
})
export class DriversOpenRegistrationComponent implements OnInit {
  list: any[] = [];
  titles: string[] = ['field.Date', 'field.PhoneNumber'];
  properties: string[] = ['dataTime', 'phone'];

  constructor(
    private providerService: ProviderService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,
    private notifier: NotifierService,
    private headerService: HeaderService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('menu.driversOpenRegistration')
    );
    this.getProviderList();
  }

  getProviderList() {
    this.spinner.show();
    this.providerService.getDriversOpenRegistration().subscribe(
      (res: {}) => {
        console.log(Object.values(res));
        this.spinner.hide();
        this.list = Object.values(res);
        console.log(
          '🚀 ~ file: drivers-open-registration.component.ts ~ line 58 ~ DriversOpenRegistrationComponent ~ getProviderList ~ this.list',
          this.list
        );
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
}
