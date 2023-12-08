import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodTypeRoutingModule } from './food-type-routing.module';
import { FoodTypeListComponent } from './food-type-list/food-type-list.component';
import { FoodTypeCrudComponent } from './food-type-crud/food-type-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodTypeShopCrudComponent } from './food-type-shop-crud/food-type-shop-crud.component';
import { DropdownModule } from 'primeng/dropdown';
import { FoodTypeProductComponent } from './food-type-product/food-type-product.component';
import { FoodTypeShopComponent } from './food-type-shop/food-type-shop.component';

@NgModule({
  declarations: [
    FoodTypeListComponent,
    FoodTypeCrudComponent,
    FoodTypeShopCrudComponent,
    FoodTypeProductComponent,
    FoodTypeShopComponent,
  ],
  imports: [
    CommonModule,
    FoodTypeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
  ],
})
export class FoodTypeModule {}
