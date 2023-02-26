import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { GeneralSuggestCrudComponent } from './general-suggest-crud/general-suggest-crud.component';
import { GeneralSuggestListComponent } from './general-suggest-list/general-suggest-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: GeneralSuggestListComponent },
      { 
        path: 'create',
       component: GeneralSuggestCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: GeneralSuggestCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: GeneralSuggestCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralSuggestRoutingModule { }
