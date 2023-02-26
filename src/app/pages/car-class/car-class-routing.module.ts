import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { CarClassCrudComponent } from './car-class-crud/car-class-crud.component';
import { CarClassListComponent } from './car-class-list/car-class-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CarClassListComponent },
      {
        path: 'create',
       component: CarClassCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: CarClassCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: CarClassCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarClassRoutingModule { }
