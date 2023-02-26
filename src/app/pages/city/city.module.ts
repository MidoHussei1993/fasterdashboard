import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityAddEditComponent } from './city-add-edit/city-add-edit.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityRoutingModule } from './city.routing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CityRoutingModule,
    RouterModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,

  ],
  declarations: [CityAddEditComponent , CityListComponent]
})
export class CityModule { }
