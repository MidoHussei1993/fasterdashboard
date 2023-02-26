import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ProductDetailsSizeCrudComponent } from './product-details-size-crud/product-details-size-crud.component';
import { ProductDetailsSizeListComponent } from './product-details-size-list/product-details-size-list.component';

const routes: Routes = [{
  path: '',
  children:[
   { path: '', component: ProductDetailsSizeListComponent },
   { 
     path: 'create',
    component: ProductDetailsSizeCrudComponent, 
    data: {mode: FormMode.Create}
    },
   { path: 'edit/:id',
    component: ProductDetailsSizeCrudComponent , 
    data: {mode: FormMode.Edit}
   },
   { path: 'view/:id',
    component: ProductDetailsSizeCrudComponent , 
    data: {mode: FormMode.View}
   },
  ] 
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailsSizeRoutingModule { }
