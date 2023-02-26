import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Faqs, FaqsFilter } from '../models';
import { FaqsService } from '../services';

@Component({
  selector: 'app-faqs-list',
  templateUrl: './faqs-list.component.html',
  styleUrls: ['./faqs-list.component.scss'],
})
export class FaqsListComponent implements OnInit {
  FaqsList: Faqs[] = [];
  titles: string[] = [
    'faqs.answer',
    'faqs.answer',
    'faqs.question',
    'faqs.question',
  ];
  properties: string[] = ['answers', 'answersAr', 'question', 'questionAr'];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: FaqsFilter = new FaqsFilter();

  constructor(
    private faqsService: FaqsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private notify: NotifierService
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getFaqsList();
  }

  searchValue(): void {
    this.getFaqsList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new FaqsFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getFaqsList();
  }

  getFaqsList() {
    this.busyLoading = true;
    this.spinner.show();
    this.faqsService.get(this.filter).subscribe(
      (res: List<Faqs>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.FaqsList = res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getFaqsList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getFaqsList();
  }

  changeActivation(index: number) {
    console.log(this.FaqsList[index].isActive);
    this.spinner.show();
    let body: {
      FAQsId: number;
      IsActive: boolean;
    } = {
      FAQsId: this.FaqsList[index].id,
      IsActive: this.FaqsList[index].isActive,
    };
    this.faqsService.ChangeFAQsActivation(body).subscribe(
      (res) => {
        this.spinner.hide();
        console.log(res);
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  navigateToEdit(faqs: Faqs) {
    this.router.navigateByUrl(`/faqs/edit/${faqs.id}`);
  }
  navigateToView(faqs: Faqs) {
    this.router.navigateByUrl(`/faqs/view/${faqs.id}`);
  }

  deleteFaqs(faqs: Faqs) {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.faqsService.delete(faqs.id).subscribe(
          (res) => {
            const deletedIndex = this.FaqsList.findIndex(
              (item) => item.id == faqs.id
            );
            this.FaqsList.splice(deletedIndex, 1);
            this.spinner.hide();
            this.notify.notify(
              'success',
              this.translate.instant('global.deleted')
            );
          },
          (err) => {
            this.spinner.hide();
            this.notify.notify(
              'error',
              this.translate.instant('global.server_error')
            );
            console.log(err);
          }
        );
      }
    });
  }
}
