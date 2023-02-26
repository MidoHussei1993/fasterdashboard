import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { AdditionalOptionFilter } from '../models';
import { AdditionalOptionService } from '../services/additional-option.service';

@Component({
  selector: 'app-additional-option-list',
  templateUrl: './additional-option-list.component.html',
  styleUrls: ['./additional-option-list.component.scss']
})
export class AdditionalOptionListComponent 
extends ListComponent<any, AdditionalOptionFilter>
implements OnInit
{
constructor(
  private additionalOptionService: AdditionalOptionService,
  public route: ActivatedRoute,
  public notifier: NotifierService,
  public translate: TranslateService,
  public spinner: NgxSpinnerService,
  public router: Router
) {
  super(
    additionalOptionService,
    notifier,
    spinner,
    translate,
    route,
    router
  );
  this.titles = [
    'field.Date',
    'field.name',
    'field.ameAr',
    'field.note',
    'field.note',
    'field.price',
  ];
  this.properties = [
    'createAt',
    'name',
    'nameAr',
    'note',
    'noteAr',
    'price',
  ];
}

ngOnInit(): void {
  this.navigateTo = 'additional-option'
  this.filter = new AdditionalOptionFilter();
  this.filter.PageNumber = 1;
  this.filter.PageSize = 10;
  this.getList();
}



navigateTO(item: { event: any; type: string }) {
  switch (item.type) {
    case 'productDetails':
      const create = this.router.serializeUrl(
        this.router.createUrlTree([`/product/${item.event.productDetailsId}/details/list`])
      );
      window.open(create, '_blank');
      break;

    default:
      break;
  }
}

resetfilter() {
  this.filter = new AdditionalOptionFilter();
}

}