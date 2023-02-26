import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryAddEditComponent } from './country-add-edit/country-add-edit.component';
import { CountryListComponent } from './country-list/country-list.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { CountryRoutingModule } from './country.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CountryRoutingModule,
    RouterModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,



  ],
  declarations: [CountryAddEditComponent, CountryListComponent]
})
export class CountryModule { }
