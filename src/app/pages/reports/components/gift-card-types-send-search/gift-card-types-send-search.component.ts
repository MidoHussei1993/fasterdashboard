import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent, CustomerAaddresses } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { GiftCardService } from '../../../gift-cards/services/gift-card.service';
import { GiftCardFilter } from '../../../gift-cards/models/gift-card-filter.model';

@Component({
  selector: 'app-gift-card-types-send-search',
  templateUrl: './gift-card-types-send-search.component.html',
  styleUrls: ['./gift-card-types-send-search.component.scss'],
})
export class GiftCardTypesSendSearchComponent
  extends ListComponent<any, any>
  implements OnInit
{
  constructor(
    private giftCardService: GiftCardService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private excelService: ExcelService
  ) {
    super(giftCardService, notifier, spinner, translate, route, router);
    this.titles = [
      'id',
      'field.Date',
      'field.title',
      'field.titleAr',
      'cardValue',
      'field.customerName',
      'customerReceivingName',
    ];
    this.properties = [
      'id',
      'createAt',
      'title',
      'titleAr',
      'cardValue',
      'customerName',
      'customerReceivingName',
    ];
  }

  ngOnInit(): void {
    this.filter = new GiftCardFilter();
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.giftCardService.GetGiftCardTypesSendSearch(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.list = res.data;
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
