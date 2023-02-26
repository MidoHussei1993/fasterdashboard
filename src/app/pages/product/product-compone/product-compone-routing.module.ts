import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ProductComponentCrudComponent } from './product-component-crud/product-component-crud.component';
import { ProductComponentListComponent } from './product-component-list/product-component-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductComponentListComponent },
      {
        path: 'create',
        component: ProductComponentCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: ProductComponentCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: ProductComponentCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductComponeRoutingModule { }
