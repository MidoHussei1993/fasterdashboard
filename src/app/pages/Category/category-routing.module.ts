import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { CategoryCrudComponent } from './Category-crud/Category-crud.component';
import { CategoryListComponent } from './Category-list/Category-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CategoryListComponent },
      {
        path: 'create',
       component: CategoryCrudComponent,
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: CategoryCrudComponent ,
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: CategoryCrudComponent ,
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
