import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filter: any;
  propertiesArray: string[] = [];
  isActiviationFilter: boolean = false;
  isgGenderFilter: boolean = false;
  isOfferFilter: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    // private readonly activatedRouteSnapshot: ActivatedRouteSnapshot
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log(Object.getOwnPropertyNames(this.filter));
    let PropertiesArray = Object.getOwnPropertyNames(this.filter);
    this.isActiviationFilter = PropertiesArray.includes('IsActive');
    this.isgGenderFilter = PropertiesArray.includes('Gender');
    this.isOfferFilter = PropertiesArray.includes('IsOffer');
    this.propertiesArray = PropertiesArray.filter(
      (item) =>
        item != 'PageNumber' &&
        item != 'PageSize' &&
        item != 'IsOffer' &&
        item != 'Gender' &&
        item != 'IsActive'
    );
    // console.log(this.filter.constructor.name);
    console.log(
      '🚀 ~ file: filter.component.ts:42 ~ FilterComponent ~ ngOnInit ~ this.activatedRoute.snapshot.queryParams:',
      this.activatedRoute.snapshot.queryParams
    );
    let queryParamsFilterClone = {};
    Object.entries(this.activatedRoute.snapshot.queryParams as Object).map(
      (keyProp) => {
        if (
          keyProp[0] == 'CreateAtFrom' ||
          keyProp[0] == 'CreateAtTo' ||
          keyProp[0] == 'ExpiryDateFrom' ||
          keyProp[0] == 'StartDate' ||
          keyProp[0] == 'EndDate' ||
          keyProp[0] == 'LastLoginFrom' ||
          keyProp[0] == 'LastLoginTo' ||
          keyProp[0] == 'CreatedAfter' ||
          keyProp[0] == 'CreatedBefore' ||
          keyProp[0] == 'ExpiryDateTo'
        ) {
          this.filter[keyProp[0]] = new Date(keyProp[1]);
        } else {
          this.filter[keyProp[0]] = keyProp[1];
        }
      }
    );

    // this.filter = {
    //   ...this.filter,
    //   ...queryParamsFilterClone,
    // };
  }
  modelChangeFn(event, propName) {
    // Assuming you want to add or update a query parameter named 'paramName' with a value of 'paramValue'
    const newQueryParam = { [propName]: event.target.value };
    // Use ActivatedRoute to get the current query parameters
    const currentQueryParams = this.route.snapshot.queryParams;
    // Merge the current query parameters with the new one
    const updatedQueryParams = { ...currentQueryParams, ...newQueryParam };
    // Use Router to navigate to the same route with the updated query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge', // This option merges the new query parameters with the existing ones
    });
  }
  dateChanged(date: Date, propName: string) {
    const newQueryParam = { [propName]: date };
    const currentQueryParams = this.route.snapshot.queryParams;
    const updatedQueryParams = { ...currentQueryParams, ...newQueryParam };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  resetFilterObject() {
    const newQueryParam = {};
    const filterClone = new this.filter.constructor();
    Object.entries(filterClone as Object).map((keyProp) => {
      newQueryParam[keyProp[0]] = keyProp[1];
      this.filter[keyProp[0]] = keyProp[1];
    });
    const currentQueryParams = this.route.snapshot.queryParams;
    const updatedQueryParams = { ...currentQueryParams, ...newQueryParam };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }
}
