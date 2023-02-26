import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { AdditionalComponentCrudComponent } from './additional-component-crud/additional-component-crud.component';
import { AdditionalComponentListComponent } from './additional-component-list/additional-component-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdditionalComponentListComponent },
      {
        path: 'create',
        component: AdditionalComponentCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: AdditionalComponentCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: AdditionalComponentCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalComponentRoutingModule { }
