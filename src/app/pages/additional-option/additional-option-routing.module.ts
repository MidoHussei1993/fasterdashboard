import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { AdditionalOptionCrudComponent } from './additional-option-crud/additional-option-crud.component';
import { AdditionalOptionListComponent } from './additional-option-list/additional-option-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdditionalOptionListComponent },
      {
        path: 'create',
        component: AdditionalOptionCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: AdditionalOptionCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: AdditionalOptionCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalOptionRoutingModule { }
