import { Component, OnInit } from '@angular/core';
import { GiftCardFilter } from '../models/gift-card-filter.model';
import { GiftCardService } from '../services/gift-card.service';
import { ListComponent } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-gift-cards-list',
  templateUrl: './gift-cards-list.component.html',
  styleUrls: ['./gift-cards-list.component.scss'],
})
export class GiftCardsListComponent
  extends ListComponent<any, any>
  implements OnInit
{
  filter: GiftCardFilter = new GiftCardFilter();
  constructor(
    private giftCardService: GiftCardService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private headerService: HeaderService,
    private excelService: ExcelService
  ) {
    super(giftCardService, notifier, spinner, translate, route, router);
    this.titles = [
      'id',
      'field.Date',
      'field.title',
      'field.titleAr',
      'cardValue',
    ];
    this.properties = ['id', 'createAt', 'title', 'titleAr', 'cardValue'];
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.giftCards'));
    this.navigateTo = 'faster-wallet/branch-wallet';
    if (this.route.snapshot.queryParams.shopBranchId) {
    }
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.giftCardService.get(this.filter).subscribe(
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
    this.filter = new GiftCardFilter();
  }

  navigateToEdit(item: any) {
    this.router.navigateByUrl(`/gift-card/edit/${item.id}`);
  }
  navigateToView(item: any) {
    this.router.navigateByUrl(`/gift-card/view/${item.id}`);
  }

  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.giftCardService
      .ChangeActivation(String(this.list[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  downloadAll() {
    this.excelService.exportAsExcelFile(this.list, 'data_file');
  }

  navigateTO(wallet: { event: any; type: string }) {
    switch (wallet.type) {
      case 'create':
        const product = this.router.serializeUrl(
          this.router.createUrlTree([
            `faster-wallet/branch-wallet/create/${wallet.event.id}`,
          ])
        );
        window.open(product, '_blank');
        break;
      case 'order':
        if (wallet.event.deliveryOrderId) {
          const deliveryOrderPage = this.router.serializeUrl(
            this.router.createUrlTree([
              `report/delivery-order/details/${wallet.event.deliveryOrderId}`,
            ])
          );
          window.open(deliveryOrderPage, '_blank');
        }
        break;
    }
  }
}
