import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { SubAdditionalComponentTitleFilter } from '../models';
import { SubAdditionalComponentTitleService } from '../services/sub-additional-component-title.service';

@Component({
  selector: 'app-sub-additional-component-title-list',
  templateUrl: './sub-additional-component-title-list.component.html',
  styleUrls: ['./sub-additional-component-title-list.component.scss']
})
export class SubAdditionalComponentTitleListComponent 
extends ListComponent<any, SubAdditionalComponentTitleFilter>
implements OnInit
{
constructor(
  private subAdditionalComponentTitleService: SubAdditionalComponentTitleService,
  public route: ActivatedRoute,
  public notifier: NotifierService,
  public translate: TranslateService,
  public spinner: NgxSpinnerService,
  public router: Router
) {
  super(
    subAdditionalComponentTitleService,
    notifier,
    spinner,
    translate,
    route,
    router
  );
  this.titles = ['field.title', 'field.titleAr'];
  this.properties = ['title', 'titleAr'];
}

ngOnInit(): void {
  this.navigateTo = 'additional-component-title';
  this.filter = new SubAdditionalComponentTitleFilter();
  this.filter.PageNumber = 1;
  this.filter.PageSize = 10;
  this.filter.AdditionalComponentId = this.route.snapshot.params.id
  this.getList();
}

navigateTO(item: { event: any; type: string }) {
  switch (item.type) {
    case 'subAdditionalComponent':
      const create = this.router.serializeUrl(
        this.router.createUrlTree([`/sub-additional-component/${item.event.id}`])
      );
      window.open(create, '_blank');
      break;

    default:
      break;
  }
}

resetfilter() {
  this.filter = new SubAdditionalComponentTitleFilter();
}

navigateToCreate() {
  this.router.navigateByUrl(
    `/sub-additional-component-title/${this.route.snapshot.params.id}/create`,
  );
}
navigateToEdit(itme: any) {
  this.router.navigateByUrl(
    `/sub-additional-component-title/${this.route.snapshot.params.id}/edit/${itme.id}`,
  );
}
navigateToView(itme: any) {
  this.router.navigateByUrl(
    `/sub-additional-component-title/${this.route.snapshot.params.id}/view/${itme.id}`
  );
}

}
