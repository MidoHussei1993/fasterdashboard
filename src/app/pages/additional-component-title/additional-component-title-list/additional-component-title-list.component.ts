import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { AdditionalComponentTitleFilter } from '../models';
import { AdditionalComponentTitleService } from '../services/additional-component-title.service';

@Component({
  selector: 'app-additional-component-title-list',
  templateUrl: './additional-component-title-list.component.html',
  styleUrls: ['./additional-component-title-list.component.scss'],
})
export class AdditionalComponentTitleListComponent
  extends ListComponent<any, AdditionalComponentTitleFilter>
  implements OnInit
{
  constructor(
    private additionalComponentTitleService: AdditionalComponentTitleService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) {
    super(
      additionalComponentTitleService,
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
    this.filter = new AdditionalComponentTitleFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    if (this.route.snapshot.queryParams.productDetailsId) {
      this.filter.ProductDetailsId =
        this.route.snapshot.queryParams.productDetailsId;
    }
    this.getList();
  }

  navigateTO(item: { event: any; type: string }) {
    switch (item.type) {
      case 'productDetails':
        const create = this.router.serializeUrl(
          this.router.createUrlTree([`/additional-component`], {
            queryParams: {
              additionalComponentTitleId: item.event.id,
            },
          })
        );
        window.open(create, '_blank');
        break;

      default:
        break;
    }
  }

  resetfilter() {
    this.filter = new AdditionalComponentTitleFilter();
  }

  navigateToCreate() {
    this.router.navigateByUrl(
      `/additional-component-title/create?ProductDetailsId=${this.route.snapshot.queryParams.productDetailsId}`,
    );
  }
  navigateToEdit(itme: any) {
    this.router.navigateByUrl(
      `/additional-component-title/edit/${itme.id}?ProductDetailsId=${this.route.snapshot.queryParams.productDetailsId}`,
    );
  }
  navigateToView(itme: any) {
    this.router.navigateByUrl(
      `/additional-component-title/view/${itme.id}?ProductDetailsId=${this.route.snapshot.queryParams.productDetailsId}`
    );
  }

}
