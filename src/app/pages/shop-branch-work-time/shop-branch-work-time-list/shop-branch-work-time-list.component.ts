import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ShopBranch } from '../../shop-branch/models';
import { ShopBranchService } from '../../shop-branch/services';
import { ShopBranchWorkTime } from '../models';
import { ShopBranchWorkTimeService } from '../services';

@Component({
  selector: 'app-shop-branch-work-time-list',
  templateUrl: './shop-branch-work-time-list.component.html',
  styleUrls: ['./shop-branch-work-time-list.component.scss'],
})
export class ShopBranchWorkTimeListComponent implements OnInit {
  @ViewChild('addToWallet', { static: false }) addToWallet;
  shopBranchWorkTimelist: ShopBranchWorkTime[] = [];
  titles: string[] = [
    'global.day',
    'field.mainTimeFrom',
    'field.mainTimeTo',
    'field.secondTimeFrom',
    'field.secondTimeTo',
  ];
  properties: string[] = [
    'day',
    'fromHour',
    'toHour',
    'secondShiftFromHour',
    'secondShiftToHour',
  ];
  busyLoading: boolean = true;
  busyDeleteing: boolean = true;
  public get formMode(): typeof FormMode {
    return FormMode;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private swalService: SwalModalService,
    private shopBranchWorkTimeService: ShopBranchWorkTimeService,
    private notify: NotifierService,
    private translate: TranslateService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getWorkTime();
  }

  getWorkTime() {
    this.busyLoading = true;
    this.spinner.show();
    this.shopBranchWorkTimeService
      .get(this.activatedRoute.snapshot.params.branch)
      .subscribe(
        (res: ShopBranchWorkTime[]) => {
          this.busyLoading = false;
          this.spinner.hide();
          this.shopBranchWorkTimelist = res;
        },
        (err) => {
          console.log(err);
          this.busyLoading = false;
          this.spinner.hide();
        }
      );
  }
  openModal() {
    this.modalService.open(this.addToWallet);
  }
  navigate(shopBranchWorkTime: ShopBranchWorkTime, type: FormMode) {
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([
          `/shop-branch-work-time/${this.activatedRoute.snapshot.params.branch}/edit/${shopBranchWorkTime.id}`,
        ]);
        break;
      case this.formMode.View:
        this.router.navigate([
          `/shop-branch-work-time/${this.activatedRoute.snapshot.params.branch}/view/${shopBranchWorkTime.id}`,
        ]);
        break;
      case this.formMode.Delete:
        this.swalService.deleteConfirmation().then((res) => {
          if (res) {
            this.busyDeleteing = true;
            this.shopBranchWorkTimeService
              .delete(shopBranchWorkTime.id)
              .subscribe(
                (res) => {
                  const deletedIndex = this.shopBranchWorkTimelist.findIndex(
                    (item) => item.id == shopBranchWorkTime.id
                  );
                  this.shopBranchWorkTimelist.splice(deletedIndex, 1);
                  this.notify.notify(
                    'success',
                    this.translate.instant('global.deleted')
                  );
                },
                (err) => {
                  this.notify.notify(
                    'error',
                    this.translate.instant('global.server_error')
                  );
                  console.log(err);
                }
              );
          }
        });
        break;

      default:
        break;
    }
  }
}
