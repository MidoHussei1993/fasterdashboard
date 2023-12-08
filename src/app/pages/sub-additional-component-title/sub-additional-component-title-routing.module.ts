import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { SubAdditionalComponentTitleCrudComponent } from './sub-additional-component-title-crud/sub-additional-component-title-crud.component';
import { SubAdditionalComponentTitleListComponent } from './sub-additional-component-title-list/sub-additional-component-title-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SubAdditionalComponentTitleListComponent },
      {
        path: 'create',
        component: SubAdditionalComponentTitleCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:subAdditionalComponentTitleId',
        component: SubAdditionalComponentTitleCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:subAdditionalComponentTitleId',
        component: SubAdditionalComponentTitleCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAdditionalComponentTitleRoutingModule { }
