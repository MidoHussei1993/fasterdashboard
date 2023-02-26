import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryAddEditComponent } from './country-add-edit/country-add-edit.component';
import { CountryListComponent } from './country-list/country-list.component';
import { FormMode } from 'src/app/shared';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CountryListComponent },
      {
        path: 'create',
       component: CountryAddEditComponent,
       data: {type: FormMode.Create}
       },
      { path: 'edit/:id',
       component: CountryAddEditComponent ,
       data: {type: FormMode.Edit}
      },
      { path: 'view/:id',
       component: CountryAddEditComponent ,
       data: {type: FormMode.View}
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
