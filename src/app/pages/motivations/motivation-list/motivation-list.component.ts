import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode, List, Dropdown } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { CustomerOrderBounsService } from '../../customer-bonus/services/customer-order-bouns.service';
import { Motivation, MotivationFilter } from '../models';
import { MotivationService } from '../services/motivation.service';

@Component({
  selector: 'app-motivation-list',
  templateUrl: './motivation-list.component.html',
  styleUrls: ['./motivation-list.component.scss'],
})
export class MotivationListComponent implements OnInit {
  motivationList: Motivation[] = [];
  titles: string[] = [
    'field.startAt',
    'field.endAt',
    'field.acceptancePercentageTarget',
    'field.motivationAmount',
    'field.orderTarget',
    'field.onLineMinutesTarget',
    'field.typeName',
    'field.Statues',
  ];
  properties: string[] = [
    'startAt',
    'endAt',
    'acceptancPercentageTarget',
    'motivationAmount',
    'orderTarget',
    'onLineMinutesTarget',
    'typeName',
    'isActive',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: MotivationFilter = new MotivationFilter();
  MotivationTypes: Dropdown[] = [];
  currentLanguage: string = '';

  constructor(
    private motivationService: MotivationService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private swalService: SwalModalService,
    private translate: TranslateService,
    private notify: NotifierService,
    private customerOrderBonusService: CustomerOrderBounsService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getMotivationList();
    this.getMotivationType();
  }

  getMotivationType() {
    this.busyLoading = true;
    this.motivationService.getMotivationTypeDDL().subscribe(
      (res: Dropdown[]) => {
        this.busyLoading = false;
        this.MotivationTypes = res;
      },
      (err) => {
        console.log(err);
        this.busyLoading = false;
      }
    );
  }

  searchValue(): void {
    this.getMotivationList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new MotivationFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getMotivationList();
  }

  getMotivationList() {
    this.busyLoading = true;
    this.spinner.show();
    this.motivationService.get(this.filter).subscribe(
      (res: List<Motivation>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.motivationList = res.data.map((item: any) => {
          if (item.isActive) {
            item.isActive = this.translate.instant('action.yes');
          } else {
            item.isActive = this.translate.instant('action.no');
          }
          return item;
        });
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  navigateTO(motivation: { event: Motivation; type: string }) {
    switch (motivation.type) {
      case 'duplicate':
        const create = this.router.serializeUrl(
          this.router.createUrlTree([`/motivation/create`], {
            queryParams: {
              motivationId: motivation.event.id,
            },
          })
        );
        window.open(create, '_blank');
        break;
      case 'evaluate':
        const evaluate = this.router.serializeUrl(
          this.router.createUrlTree([`/motivation/evaluate`], {
            queryParams: {
              evaluate: motivation.event.id,
            },
          })
        );
        window.open(evaluate, '_blank');
        break;

      default:
        break;
    }
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getMotivationList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getMotivationList();
  }

  changeActivation(index: number) {
    this.spinner.show();
    this.motivationService
      .ChangeActivation(String(this.motivationList[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getMotivationList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  navigateToEdit(Motivation: Motivation) {
    this.router.navigateByUrl(`/motivation/edit/${Motivation.id}`);
  }
  navigateToView(Motivation: Motivation) {
    const View = this.router.serializeUrl(
      this.router.createUrlTree([`motivation/view/${Motivation.id}`])
    );
    window.open(View, '_blank');
  }

  deleteMotivation(Motivation: Motivation) {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.motivationService.delete(Motivation.id).subscribe(
          (res) => {
            const deletedIndex = this.motivationList.findIndex(
              (item) => item.id == Motivation.id
            );
            this.motivationList.splice(deletedIndex, 1);
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

  getCustomerOrderBonus(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.customerOrderBonusService.getByID(id).subscribe(
      (res) => {
        this.spinner.hide();
        res.startAt = new Date(res.startAt);
        this.spinner.hide();
        this.excelService.exportAsExcelFile(res, 'data_file');
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
}
