import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pagination } from 'src/app/shared';
import { User, UserFilter } from '../models';
import { IdentityService, IList } from '../services/identity.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userlist: User[] = [];
  titles: string[] = [
    'global.identificationNumber',
    'global.full_name',
    'field.email',
    'global.phone_number',
  ];
  properties: string[] = [
    'identificationNumber',
    'fullName',
    'email',
    'phoneNumber',
  ];
  @ViewChild('resetPass', { static: false }) resetPass;
  form: FormGroup;
  rowData: User = new User();

  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50, 60];
  active: number = 1;

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: UserFilter = new UserFilter();

  constructor(
    private identityService: IdentityService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notifier: NotifierService,
    private translate: TranslateService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 100;
    this.getUserList();
  }

  searchValue(): void {
    this.getUserList();
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new UserFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getUserList();
  }

  getUserList() {
    this.busyLoading = true;
    this.spinner.show();
    this.identityService.getUsers(this.filter).subscribe(
      (res: IList<User>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.userlist = res.returnData.data;
        this.pagination = { ...res.returnData };
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.busyLoading = false;
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getUserList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.active = pageNumber;
    this.filter.PageNumber = pageNumber;
    this.getUserList();
  }

  changeActivation(index: number) {
    console.log(this.userlist[index].isActive);
    this.spinner.show();
    if (this.userlist[index].isActive) {
      this.identityService.setUserActive(this.userlist[index].id).subscribe(
        (res) => {
          this.spinner.hide();
          this.notifier.notify(
            'success',
            this.translate.instant('global.edited')
          );
        },
        (err) => {
          this.spinner.hide();
        }
      );
    } else {
      this.identityService.setUserDeActive(this.userlist[index].id).subscribe(
        (res) => {
          this.spinner.hide();
          this.notifier.notify(
            'success',
            this.translate.instant('global.edited')
          );
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  }

  navigateToView(user: User) {
    this.router.navigateByUrl(`/identity/users/view/${user.id}`);
  }
  navigateTO(user: { event: User; type: string }) {
    console.log(user);
    switch (user.type) {
      case 'role':
        this.router.navigateByUrl(`/identity/user-roles/${user.event.id}`);
        break;
      case 'reset':
        this.rowData = user.event;
        this.openModal();
        break;
        case 'priviledge':
          this.router.navigateByUrl(
            `/identity/users/priviledge/${user.event.id}`
          );
          break;
          case 'userActionTracking':
        this.router.navigateByUrl(
          `/app/user-action-tracking/${user.event.id}`
        );
        break;

      default:
        break;
    }
  }

  openModal() {
    this.modalService.open(this.resetPass, {
      backdropClass: 'light-blue-backdrop',
    });
  }
  resetPassword() {
    this.form.markAsTouched();
    this.form.get('userId').patchValue(this.rowData.id);
    if (!this.form.valid) return;
    this.identityService.ResetPassword(this.form.value).subscribe(
      (result) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        this.form.reset();
        this.notifier.notify('success', this.translate.instant('action.done'));
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
}
