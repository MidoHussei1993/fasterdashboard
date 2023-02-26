import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { CarNameCrudComponent } from './car-name-crud/car-name-crud.component';
import { CarNameListComponent } from './car-name-list/car-name-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CarNameListComponent },
      {
        path: 'create',
       component: CarNameCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: CarNameCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: CarNameCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarNameRoutingModule { }
