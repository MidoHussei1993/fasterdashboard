import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { CityAddEditComponent } from './city-add-edit/city-add-edit.component';
import { CityListComponent } from './city-list/city-list.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CityListComponent },
      {
        path: 'create',
       component: CityAddEditComponent,
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: CityAddEditComponent ,
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: CityAddEditComponent ,
       data: {mode: FormMode.View}
      }
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
