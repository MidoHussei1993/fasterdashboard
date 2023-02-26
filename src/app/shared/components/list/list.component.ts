import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from '../../models';
import { SwalModalService } from '../../services/swal-modal.service';

declare type Clazz<T> = {
  new (...args: any[]): T;
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<T, F> implements OnInit {
  list: T[] = [];
  titles: string[] = [];
  properties: string[] = [];
  pagination: Pagination = new Pagination();
  filter: F;
  private spinner: NgxSpinnerService = new NgxSpinnerService();
  private router: Router;

  constructor(private injector: Injector) {
    this.router = injector.get(Router);
    console.log(this.router);
  }

  ngOnInit(): void {}

  getList;
}
