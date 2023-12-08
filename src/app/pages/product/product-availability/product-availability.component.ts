import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { AdditionalComponentTitleFilter } from '../../additional-component-title/models';
import { ProductService } from '../services';

@Component({
  selector: 'app-product-availability',
  templateUrl: './product-availability.component.html',
  styleUrls: ['./product-availability.component.scss'],
})
export class ProductAvailabilityComponent
  extends ListComponent<any, AdditionalComponentTitleFilter>
  implements OnInit
{
  constructor(
    private productService: ProductService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) {
    super(productService, notifier, spinner, translate, route, router);
    this.titles = [
      'field.createAt',
      'global.day',
       'field.StartDate',
       'field.EndDate',
      ];
    this.properties = [
      'createAt',
       'dayOfWeek',
       'startTime',
       'endTime',
      ];
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

  getList() {
    this.spinner.show();
    this.productService
      .GetProductAvailability(this.route.snapshot.params.id)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.list = res;
          // this.pagination = { ...res };
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
  }
}
