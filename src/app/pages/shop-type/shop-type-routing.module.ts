import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ShopTypeCrudComponent } from './shop-type-crud/shop-type-crud.component';
import { ShopTypeListComponent } from './shop-type-list/shop-type-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ShopTypeListComponent },
      { 
        path: 'create',
       component: ShopTypeCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: ShopTypeCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: ShopTypeCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopTypeRoutingModule { }
