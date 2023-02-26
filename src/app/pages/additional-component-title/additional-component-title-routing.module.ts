import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { AdditionalComponentTitleCrudComponent } from './additional-component-title-crud/additional-component-title-crud.component';
import { AdditionalComponentTitleListComponent } from './additional-component-title-list/additional-component-title-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdditionalComponentTitleListComponent },
      {
        path: 'create',
        component: AdditionalComponentTitleCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: AdditionalComponentTitleCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: AdditionalComponentTitleCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalComponentTitleRoutingModule {}
