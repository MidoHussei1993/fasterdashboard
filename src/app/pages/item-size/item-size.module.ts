import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemSizeRoutingModule } from './item-size-routing.module';
import { ItemSizeListComponent } from './item-size-list/item-size-list.component';
import { ItemSizeCrudComponent } from './item-size-crud/item-size-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ItemSizeListComponent,
    ItemSizeCrudComponent
  ],
  imports: [
    CommonModule,
    ItemSizeRoutingModule, 
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ItemSizeModule { }
