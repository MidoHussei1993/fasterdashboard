import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ProductAdditionalOptionsCrudComponent } from './product-additional-options-crud/product-additional-options-crud.component';
import { ProductAdditionalOptionsListComponent } from './product-additional-options-list/product-additional-options-list.component';

const routes: Routes = [{
   path: '',
   children:[
    { path: '', component: ProductAdditionalOptionsListComponent },
    { 
      path: 'create',
     component: ProductAdditionalOptionsCrudComponent, 
     data: {mode: FormMode.Create}
     },
    // { path: 'edit/:id',
    //  component: ProductAdditionalOptionsCrudComponent , 
    //  data: {mode: FormMode.Edit}
    // },
    { path: 'view/:id',
     component: ProductAdditionalOptionsCrudComponent , 
     data: {mode: FormMode.View}
    },
   ] 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAdditionalOptionsRoutingModule {}
