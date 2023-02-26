import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggerListComponent } from './logger-list/logger-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoggerListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggerRoutingModule { }
