import { Component, Input, OnInit } from '@angular/core';

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
  constructor() {}

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
    // console.log(this.propertiesArray);
  }
}
