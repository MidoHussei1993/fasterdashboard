import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { FaqsCrudComponent } from './faqs-crud/faqs-crud.component';
import { FaqsListComponent } from './faqs-list/faqs-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: FaqsListComponent },
      {
        path: 'create',
       component: FaqsCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: FaqsCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: FaqsCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqsRoutingModule { }
