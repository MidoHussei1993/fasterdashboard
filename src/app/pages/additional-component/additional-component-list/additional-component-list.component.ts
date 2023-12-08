import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { AdditionalComponentFilter } from '../models';
import { AdditionalComponentService } from '../services/additional-component.service';

@Component({
  selector: 'app-additional-component-list',
  templateUrl: './additional-component-list.component.html',
  styleUrls: ['./additional-component-list.component.scss']
})
export class AdditionalComponentListComponent 
extends ListComponent<any, AdditionalComponentFilter>
implements OnInit
{
constructor(
  private additionalComponentService: AdditionalComponentService,
  public route: ActivatedRoute,
  public notifier: NotifierService,
  public translate: TranslateService,
  public spinner: NgxSpinnerService,
  public router: Router
) {
  super(
    additionalComponentService,
    notifier,
    spinner,
    translate,
    route,
    router
  );
  this.titles = [
    'field.Date',
    'field.title',
    'field.titleAr',
    'field.price',
  ];
  this.properties = [
    'createAt',
    'componentName',
    'componentNameAr',
    'price',
  ];
}

ngOnInit(): void {
  this.navigateTo = 'additional-component'
  this.filter = new AdditionalComponentFilter();
  if (this.route.snapshot.queryParams.additionalComponentTitleId) {
    this.filter.AdditionalComponentTitleId =
      this.route.snapshot.queryParams.additionalComponentTitleId;
  }
  this.filter.PageNumber = 1;
  this.filter.PageSize = 10;
  this.getList();
}



navigateTO(item: { event: any; type: string }) {
  switch (item.type) {
    case 'subAdditionalCopnentTilte':
      const create = this.router.serializeUrl(
        this.router.createUrlTree([`/sub-additional-component-title/${item.event.id}`])
      );
      window.open(create, '_blank');
      break;

    default:
      break;
  }
}

resetfilter() {
  this.filter = new AdditionalComponentFilter();
}

navigateToCreate() {
  this.router.navigateByUrl(
    `/additional-component/create?additionalComponentTitleId=${this.route.snapshot.queryParams.additionalComponentTitleId}`,
  );
}
navigateToEdit(itme: any) {
  this.router.navigateByUrl(
    `/additional-component/edit/${itme.id}?additionalComponentTitleId=${this.route.snapshot.queryParams.additionalComponentTitleId}`,
  );
}
navigateToView(itme: any) {
  this.router.navigateByUrl(
    `/additional-component/view/${itme.id}?additionalComponentTitleId=${this.route.snapshot.queryParams.additionalComponentTitleId}`
  );
}

}