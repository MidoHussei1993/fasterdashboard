import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturingYearRoutingModule } from './manufacturing-year-routing.module';
import { ManufacturingYearListComponent } from './manufacturing-year-list/manufacturing-year-list.component';
import { ManufacturingYearCrudComponent } from './manufacturing-year-crud/manufacturing-year-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ManufacturingYearListComponent,
    ManufacturingYearCrudComponent
  ],
  imports: [
    CommonModule,
    ManufacturingYearRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ManufacturingYearModule { }
