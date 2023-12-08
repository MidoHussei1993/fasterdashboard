import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/constant/form-modes';
import { BundleProductComponent } from './bundle-product/bundle-product.component';
import { ProductAvailabilityComponent } from './product-availability/product-availability.component';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { ProductDetailsCrudComponent } from './product-details-crud/product-details-crud.component';
import { ProductDetailsListComponent } from './product-details-list/product-details-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { QuickAccessComponent } from './quick-access/quick-access.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductListComponent },
      {
        path: 'quick-access/:id',
        component: QuickAccessComponent,
      },
      {
        path: 'create',
        component: ProductCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: ProductCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: ProductCrudComponent,
        data: { mode: FormMode.View },
      },
      {
        path: ':productId/details/list',
        component: ProductDetailsListComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: ':productId/details/create',
        component: ProductDetailsCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: ':productId/details/edit/:id',
        component: ProductDetailsCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'availability/:id',
        component: ProductAvailabilityComponent,
        data: { mode: FormMode.View },
      },
      {
        path: 'bundle-product',
        component: BundleProductComponent,
        //  data: {mode: FormMode.Create}
      },
      {
        path: 'additional-options/:productId',
        loadChildren: () =>
          import(
            './product-additional-options/product-additional-options.module'
          ).then((m) => m.ProductAdditionalOptionsModule),
      },
      {
        path: 'components/:detailsId',
        loadChildren: () =>
          import('./product-compone/product-compone.module').then(
            (m) => m.ProductComponeModule
          ),
      },
      {
        path: 'size-details/:detailsId',
        loadChildren: () =>
          import('./product-details-size/product-details-size.module').then(
            (m) => m.ProductDetailsSizeModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
