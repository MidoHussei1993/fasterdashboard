import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarModelRoutingModule } from './car-model-routing.module';
import { CarModelListComponent } from './car-model-list/car-model-list.component';
import { CarModelCrudComponent } from './car-model-crud/car-model-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CarModelListComponent,
    CarModelCrudComponent
  ],
  imports: [
    CommonModule,
    CarModelRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CarModelModule { }
