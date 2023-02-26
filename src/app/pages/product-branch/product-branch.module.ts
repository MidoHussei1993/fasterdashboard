import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductBranchRoutingModule } from './product-branch-routing.module';
import { ProductBranchListComponent } from './product-branch-list/product-branch-list.component';
import { ProductBranchCrudComponent } from './product-branch-crud/product-branch-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductBranchListComponent,
    ProductBranchCrudComponent,
  ],
  imports: [
    CommonModule,
    ProductBranchRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductBranchModule { }
