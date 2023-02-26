import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { FoodTypeCrudComponent } from './food-type-crud/food-type-crud.component';
import { FoodTypeListComponent } from './food-type-list/food-type-list.component';
import { FoodTypeShopCrudComponent } from './food-type-shop-crud/food-type-shop-crud.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: FoodTypeListComponent },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodTypeRoutingModule { }
