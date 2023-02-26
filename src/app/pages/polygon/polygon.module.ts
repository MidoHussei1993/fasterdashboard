import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolygonRoutingModule } from './polygon-routing.module';
import { PolygonListComponent } from './polygon-list/polygon-list.component';
import { PolygonCrudComponent } from './polygon-crud/polygon-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PolygonListComponent,
    PolygonCrudComponent
  ],
  imports: [
    CommonModule,
    PolygonRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PolygonModule { }
