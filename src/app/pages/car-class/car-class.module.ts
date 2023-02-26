import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarClassRoutingModule } from './car-class-routing.module';
import { CarClassCrudComponent } from './car-class-crud/car-class-crud.component';
import { CarClassListComponent } from './car-class-list/car-class-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CarClassCrudComponent,
    CarClassListComponent
  ],
  imports: [
    CommonModule,
    CarClassRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CarClassModule { }
