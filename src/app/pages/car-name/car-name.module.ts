import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarNameRoutingModule } from './car-name-routing.module';
import { CarNameListComponent } from './car-name-list/car-name-list.component';
import { CarNameCrudComponent } from './car-name-crud/car-name-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CarNameListComponent,
    CarNameCrudComponent
  ],
  imports: [
    CommonModule,
    CarNameRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CarNameModule { }
