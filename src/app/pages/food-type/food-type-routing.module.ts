import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { FoodTypeCrudComponent } from './food-type-crud/food-type-crud.component';
import { FoodTypeListComponent } from './food-type-list/food-type-list.component';
import { FoodTypeShopCrudComponent } from './food-type-shop-crud/food-type-shop-crud.component';
import { FoodTypeProductComponent } from './food-type-product/food-type-product.component';
import { FoodTypeShopComponent } from './food-type-shop/food-type-shop.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: FoodTypeListComponent },
      {
        path: 'shop',
        component: FoodTypeShopComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'create',
        component: FoodTypeCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: FoodTypeCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: FoodTypeCrudComponent,
        data: { mode: FormMode.View },
      },
      {
        path: 'create-food-shop',
        component: FoodTypeShopCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'product/:id',
        component: FoodTypeProductComponent,
        data: { mode: FormMode.Create },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodTypeRoutingModule {}
