import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ProductBranchCrudComponent } from './product-branch-crud/product-branch-crud.component';
import { ProductBranchListComponent } from './product-branch-list/product-branch-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductBranchListComponent },
      { 
        path: 'create',
       component: ProductBranchCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: ProductBranchCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: ProductBranchCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBranchRoutingModule { }
