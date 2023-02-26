import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { SalaryCrudComponent } from './salary-crud/salary-crud.component';
import { SalaryListComponent } from './salary-list/salary-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SalaryListComponent },
      {
        path: 'create',
        component: SalaryCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'evaluate',
        component: SalaryCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: 'edit/:id',
        component: SalaryCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: 'view/:id',
        component: SalaryCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryRoutingModule {}
