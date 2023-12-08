import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, List, Pagination } from 'src/app/shared';
import { IdentityService } from '../../identity/services/identity.service';
import { Vendor, VendorFilter } from '../models';
import { VendorService } from '../services/vendor.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'],
})
export class VendorListComponent implements OnInit {
  @ViewChild('resetPassword', { static: false }) resetPassword;
  VendorList: Vendor[] = [];
  titles: string[] = [
    'field.ApplicationUserId',
    'field.name',
    'field.phoneNumber',
    'field.email',
  ];
  properties: string[] = [
    'applicationUserId',
    'fullName',
    'phoneNumber',
    'email',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: VendorFilter = new VendorFilter();
  form: FormGroup;

  constructor(
    private vendorService: VendorService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.vendor'));
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getVendorList();
  }

  searchValue(): void {
    this.getVendorList();
  }

  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new VendorFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getVendorList();
  }

  getVendorList() {
    this.busyLoading = true;
    this.spinner.show();
    this.vendorService.get(this.filter).subscribe(
      (res: List<Vendor>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.VendorList = res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }
  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.vendorService
      .ChangeActivation(String(this.VendorList[index].id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getVendorList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getVendorList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getVendorList();
  }

  navigateToEdit(Vendor: Vendor) {
    this.router.navigateByUrl(`/vendor/edit/${Vendor.id}`);
  }
  navigateToView(Vendor: Vendor) {
    this.router.navigateByUrl(`/vendor/view/${Vendor.id}`);
  }
  navigateTO(vendor: { event: Vendor; type: string }) {
    switch (vendor.type) {
      case 'resetPassword':
        this.form.get('userId').patchValue(vendor.event.applicationUserId);
        this.modalService.open(this.resetPassword, {
          backdropClass: 'light-blue-backdrop',
        });
        break;
      default:
        break;
    }
  }

  create() {
    if (!this.form.valid) return;
    let body = this.form.value;
    this.spinner.show();
    this.identityService.ResetPassword(body).subscribe(
      (result) => {
        this.form.reset();
        this.spinner.hide();
        this.modalService.dismissAll();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify('error', err);
      }
    );
  }
}
