import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { SubAdditionalComponentService } from '../services/sub-additional-component.service';
import { SubAdditionalComponentFilter } from '../models';

@Component({
  selector: 'app-sub-additional-component-list',
  templateUrl: './sub-additional-component-list.component.html',
  styleUrls: ['./sub-additional-component-list.component.scss']
})
export class SubAdditionalComponentListComponent 
extends ListComponent<any, SubAdditionalComponentFilter>
implements OnInit
{
constructor(
  private subAdditionalComponentService: SubAdditionalComponentService,
  public route: ActivatedRoute,
  public notifier: NotifierService,
  public translate: TranslateService,
  public spinner: NgxSpinnerService,
  public router: Router
) {
  super(
    subAdditionalComponentService,
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
  this.filter = new SubAdditionalComponentFilter();
  this.filter.PageNumber = 1;
  this.filter.PageSize = 10;
  this.filter.SubAdditionalComponentTitleId = this.route.snapshot.params.id
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
  this.filter = new SubAdditionalComponentFilter();
}

navigateToCreate() {
  this.router.navigateByUrl(
    `/sub-additional-component/${this.route.snapshot.params.id}/create`,
  );
}
navigateToEdit(itme: any) {
  this.router.navigateByUrl(
    `/sub-additional-component/${this.route.snapshot.params.id}/edit/${itme.id}`,
  );
}
navigateToView(itme: any) {
  this.router.navigateByUrl(
    `/sub-additional-component/${this.route.snapshot.params.id}/view/${itme.id}`
  );
}

}