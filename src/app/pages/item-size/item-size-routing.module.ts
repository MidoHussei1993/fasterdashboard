import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ItemSizeCrudComponent } from './item-size-crud/item-size-crud.component';
import { ItemSizeListComponent } from './item-size-list/item-size-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ItemSizeListComponent },
      { 
        path: 'create',
       component: ItemSizeCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: ItemSizeCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: ItemSizeCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemSizeRoutingModule { }
