import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { MoyaserFilter } from '../models/moyaser-filter.model';
import { MoyaserService } from '../services/moyaser.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-moyaser-list',
  templateUrl: './moyaser-list.component.html',
  styleUrls: ['./moyaser-list.component.scss'],
})
export class MoyaserListComponent
  extends ListComponent<any, any>
  implements OnInit
{
  @ViewChild('customerPhoneModal', { static: false }) customerPhoneModal;
  customerPhoneNumber: string;

  constructor(
    private moyaserService: MoyaserService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private excelService: ExcelService,
    private headerService: HeaderService,
    public router: Router
  ) {
    super(moyaserService, notifier, spinner, translate, route, router);
    this.titles = [
      'field.Date',
      'field.description',
      // 'provider.amount',
      // 'field.fee',
      'field.formattedAmount',
      // 'field.formattedCapturedAmount',
      'field.statusName',
    ];
    this.properties = [
      'createdAt',
      'description',
      // 'amount',
      // 'fee',
      'formattedAmount',
      // 'formattedCapturedAmount',
      'status',
    ];
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.moyaser'));
    // this.navigateTo = 'food-type';
    this.filter = new MoyaserFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;

    // this.getList();
  }
  resetfilter() {
    this.filter = new MoyaserFilter();
  }
  searchValue(): void {
    this.getList();
  }

  getList() {
    console.log('get list of items');
    this.spinner.show();
    this.moyaserService.get(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.list = res.returnData.data;
        delete res.returnData.data;
        this.pagination = { ...res.returnData };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  navigateTO(item: { event: any; type: string }) {
    switch (item.type) {
      case 'showCustomerNumberModal':
        this.getCustomerPhoneNumber(item.event.description);
        break;

      default:
        break;
    }
  }
  getCustomerPhoneNumber(description: string) {
    this.spinner.show();
    this.moyaserService.getCustomerPhone(description).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.modalService.open(this.customerPhoneModal, {
          // backdropClass: 'light-blue-backdrop',
        });
        this.customerPhoneNumber = res.returnData;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.moyaserService.get(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.excelService.exportAsExcelFile(res.returnData.data, 'data_file');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
}
