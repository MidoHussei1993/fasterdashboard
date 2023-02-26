import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Pagination,
  FormMode,
  CustomerService,
  CustomerFilter,
} from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { IdentityFilter, Customer } from '../models';
import { IdentityService, IList } from '../services/identity.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customerList: Customer[] = [];
  titles: string[] = [
    'global.full_name',
    'field.email',
    'field.createAt',
    'global.phone_number',
    'global.type',
  ];
  properties: string[] = [
    'fullName',
    'email',
    'createAt',
    'phoneNumber',
    'gender',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: CustomerFilter = new CustomerFilter();

  constructor(
    private identityService: IdentityService,
    private customerService: CustomerService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,
    private excelService: ExcelService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    if (this.activatedRoute.snapshot.queryParams.customerPhone) {
      this.filter.phoneNumber =
        this.activatedRoute.snapshot.queryParams.customerPhone;
    }
    if (this.activatedRoute.snapshot.queryParams.customerId) {
      this.filter.CustomerId =
        this.activatedRoute.snapshot.queryParams.customerId;
    }
    this.getCustomerList();
  }

  searchValue(): void {
    this.getCustomerList();
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CustomerFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }

  getCustomerList() {
    this.busyLoading = true;
    this.spinner.show();
    this.customerService.get(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        res.data = res.data.map((provider) => {
          switch (provider.gender) {
            case 0:
              provider.gender = this.translate.instant('field.undefined');
              break;
            case 1:
              provider.gender = this.translate.instant('global.male');
              break;
            case 2:
              provider.gender = this.translate.instant('global.female');
              break;

            default:
              break;
          }
          return provider;
        });
        this.customerList = res.data;
        delete res.data;
        this.pagination = { ...res };
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.busyLoading = false;
      }
    );
  }

  setPageSize(pageSize) {
    console.log(pageSize);
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCustomerList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getCustomerList();
  }

  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.identityService
      .changeUserActivate(this.customerList[index].applicationUserId)
      .subscribe(
        (res) => {
          this.spinner.hide();
          // this.getProviderList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  navigateToView(customer: Customer) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([
        `/identity/users/view/${customer.applicationUserId}`,
      ])
    );
    window.open(url, '_blank');
  }

  navigateTO(customer: { event: Customer; type: string }) {
    switch (customer.type) {
      case 'customerNotes':
        const customerNotesUrl = this.router.serializeUrl(
          this.router.createUrlTree(
            [`/identity/customers/notes/${customer.event.id}`],
            {
              queryParams: { userId: customer.event.applicationUserId },
            }
          )
        );
        window.open(customerNotesUrl, '_blank');
        // this.router.navigateByUrl(
        //   `/identity/customers/notes/${customer.event.id}?userId=${customer.event.applicationUserId}`
        // );
        break;
      case 'wallet':
        const walletUrl = this.router.serializeUrl(
          this.router.createUrlTree(
            [`/identity/customers/wallet/${customer.event.id}`],
            {
              queryParams: {
                customerName: customer.event.fullName,
                customerPhone: customer.event.phoneNumber,
              },
            }
          )
        );
        window.open(walletUrl, '_blank');
       
        break;
        case 'order':
          const url = this.router.serializeUrl(
            this.router.createUrlTree([
              `/report/customer-order/${customer.event.id}`,
            ])
          );
          window.open(url, '_blank');
         
          break;
          case 'customerReferrer':
        const referrerUrl = this.router.serializeUrl(
          this.router.createUrlTree([
            `/report/customer-referrer/${customer.event.id}`,
          ])
        );
        window.open(referrerUrl, '_blank');
        break;

      default:
        break;
    }
  }

  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.customerService
      .get(downloadFilter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.excelService.exportAsExcelFile(res.data, 'data_file');
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
        }
      );
  }

}
