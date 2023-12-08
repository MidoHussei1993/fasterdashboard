import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { SubAdditionalComponentCrudComponent } from './sub-additional-component-crud/sub-additional-component-crud.component';
import { SubAdditionalComponentListComponent } from './sub-additional-component-list/sub-additional-component-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SubAdditionalComponentListComponent },
      {
        path: 'create',
        component: SubAdditionalComponentCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:subAdditionalComponentId',
        component: SubAdditionalComponentCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:subAdditionalComponentId',
        component: SubAdditionalComponentCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAdditionalComponentRoutingModule { }
