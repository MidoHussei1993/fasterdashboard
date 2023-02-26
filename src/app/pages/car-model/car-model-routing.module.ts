import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Model } from 'echarts';
import { FormMode } from 'src/app/shared';
import { CarModelCrudComponent } from './car-model-crud/car-model-crud.component';
import { CarModelListComponent } from './car-model-list/car-model-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CarModelListComponent },
      {
        path: 'create',
       component: CarModelCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: CarModelCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: CarModelCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarModelRoutingModule { }
