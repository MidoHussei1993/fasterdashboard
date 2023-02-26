import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Dropdown } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { VendorService } from '../../vendor/services/vendor.service';
import { ProviderService } from '../services';

@Component({
  selector: 'app-provider-acceptance-report',
  templateUrl: './provider-acceptance-report.component.html',
  styleUrls: ['./provider-acceptance-report.component.scss'],
})
export class ProviderAcceptanceReportComponent implements OnInit {
  providerAcceptanceReportList: any[] = [];
  titles: string[] = [
    'field.ProviderId',
    'field.ProviderName',
    'field.ProviderPhone',
    // 'field.VendorId',
    // 'field.Name',
    'field.acceptedOrdersCount',
    'field.workingMinitues',
    'field.rejectedOrders',
    'field.acceptenceRate',
  ];
  properties: string[] = [
    'providerId',
    'providerName',
    'providerPhoneNumber',
    // 'vendorId',
    // 'vendorName',
    'acceptedOrders',
    'workingMinitues',
    'rejectedOrders',
    'acceptenceRate',
  ];
  busyLoading: boolean = true;
  // pagination: Pagination = new Pagination();

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  filter: {
    StartDate: string;
    EndDate: string;
  } = {
    StartDate: null,
    EndDate: null,
  };
  currentLanguage: string = '';

  vendorList: Dropdown[] = [];

  vendorId: number = null;

  constructor(
    private providerService: ProviderService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private translate: TranslateService,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
    this.getVendorList();
    // this.filter.PageNumber = 1;
    // this.filter.PageSize = 10;
    // this.getProviderAcceptanceReportList();
  }

  getVendorList() {
    this.vendorService.getDropdown().subscribe((res) => {
      this.vendorList = res;
    });
  }

  searchValue(): void {
    if (!this.vendorId) return;
    this.getProviderAcceptanceReportList();
  }

  resetfilter() {
    // let pagePagination = {
    //   PageNumber: this.filter.PageNumber,
    //   PageSize: this.filter.PageSize,
    // };
    this.filter = {
      EndDate: null,
      StartDate: null,
    };
    // this.filter.PageNumber = pagePagination.PageNumber;
    // this.filter.PageSize = pagePagination.PageSize;
    this.getProviderAcceptanceReportList();
  }

  getProviderAcceptanceReportList() {
    this.busyLoading = true;
    this.spinner.show();
    this.providerService
      .getProviderAcceptanceReport(this.vendorId, this.filter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.providerAcceptanceReportList = res;
          // this.pagination = { ...res };
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
          this.busyLoading = false;
        }
      );
  }

  downloadAll() {
    this.excelService.exportAsExcelFile(
      this.providerAcceptanceReportList,
      'data_file'
    );
  }

  // setPageSize(pageSize) {
  //   if (pageSize == this.filter.PageSize) return;
  //   this.filter.PageSize = pageSize;
  //   this.getProviderAcceptanceReportList();
  // }

  // setPageNumber(pageNumber: number) {
  //   if (pageNumber == this.filter.PageNumber) return;
  //   this.filter.PageNumber = pageNumber;
  //   this.getProviderAcceptanceReportList();
  // }
}
