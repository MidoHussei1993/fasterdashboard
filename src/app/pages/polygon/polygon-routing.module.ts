import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { PolygonCrudComponent } from './polygon-crud/polygon-crud.component';
import { PolygonListComponent } from './polygon-list/polygon-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PolygonListComponent },
      {
        path: 'create',
        component: PolygonCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: PolygonCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: PolygonCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolygonRoutingModule { }
