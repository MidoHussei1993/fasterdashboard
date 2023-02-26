import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { ManufacturingYearCrudComponent } from './manufacturing-year-crud/manufacturing-year-crud.component';
import { ManufacturingYearListComponent } from './manufacturing-year-list/manufacturing-year-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ManufacturingYearListComponent },
      {
        path: 'create',
       component: ManufacturingYearCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: ManufacturingYearCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: ManufacturingYearCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturingYearRoutingModule { }
