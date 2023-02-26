import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { MotivationCrudComponent } from './motivation-crud/motivation-crud.component';
import { MotivationListComponent } from './motivation-list/motivation-list.component';
import { ProviderMotivationsProgressComponent } from './provider-motivations-progress/provider-motivations-progress.component';
import { ProviderMotivationsComponent } from './provider-motivations/provider-motivations.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MotivationListComponent },
      {
        path: 'create',
       component: MotivationCrudComponent, 
       data: {mode: FormMode.Create}
       },
       {
        path: 'evaluate',
       component: MotivationCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: MotivationCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: MotivationCrudComponent , 
       data: {mode: FormMode.View}
      },
      { path: 'provider-motivation/:id',
       component: ProviderMotivationsComponent , 
      },
      { path: 'provider-motivation-progress/:providerId/:motivationId',
       component: ProviderMotivationsProgressComponent , 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivationsRoutingModule { }
